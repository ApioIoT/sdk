#!/bin/sh
# Increments the project version (e.g. from 2.3.0 to 2.4.0)
# Supports prerelease versions (alpha, beta, rc)
# It handles stuff like
# * CHANGELOG
# * NPM package version
# * Git tags

# Calculating the new version requires to know which kind of update this is
# The default version increment is patch
# Used values: major|minor|patch|premajor|preminor|prepatch|prerelease
# For prerelease: major|minor|patch followed by -alpha|-beta|-rc
# Examples:
#   ./release.sh patch        -> 2.3.0 -> 2.3.1
#   ./release.sh minor        -> 2.3.0 -> 2.4.0
#   ./release.sh patch-alpha  -> 2.3.0 -> 2.3.1-alpha.0
#   ./release.sh prerelease   -> 2.3.1-alpha.0 -> 2.3.1-alpha.1
#   ./release.sh minor-beta   -> 2.3.1-alpha.1 -> 2.4.0-beta.0
#   ./release.sh patch        -> 2.3.1-alpha.1 -> 2.3.1 (graduate prerelease)

if [ -z "$1" ]
then
  versionType="patch"
else
  versionType=$1
fi

# Get current version
currentVersion="$(grep '"version"' package.json | cut -d'"' -f4)"

rollback() {
  echo "❌ Release annullata. Ripristino della versione precedente..."
  # Restore the original version
  npm --no-git-tag-version version "$currentVersion" > /dev/null 2>&1
  echo "✅ Versione ripristinata a $currentVersion"
}

# Parse version type and prerelease identifier
preid=""
npmVersionType="$versionType"

case "$versionType" in
  major-alpha|minor-alpha|patch-alpha)
    baseType=$(echo "$versionType" | cut -d'-' -f1)
    preid="alpha"
    npmVersionType="pre$baseType"
    ;;
  major-beta|minor-beta|patch-beta)
    baseType=$(echo "$versionType" | cut -d'-' -f1)
    preid="beta"
    npmVersionType="pre$baseType"
    ;;
  major-rc|minor-rc|patch-rc)
    baseType=$(echo "$versionType" | cut -d'-' -f1)
    preid="rc"
    npmVersionType="pre$baseType"
    ;;
  prerelease-alpha)
    preid="alpha"
    npmVersionType="prerelease"
    ;;
  prerelease-beta)
    preid="beta"
    npmVersionType="prerelease"
    ;;
  prerelease-rc)
    preid="rc"
    npmVersionType="prerelease"
    ;;
  prerelease)
    # Use existing preid from current version
    npmVersionType="prerelease"
    ;;
  major|minor|patch)
    # Standard release
    npmVersionType="$versionType"
    ;;
  *)
    echo "❌ Invalid version type: $versionType"
    echo "Usage: $0 [major|minor|patch|major-alpha|minor-alpha|patch-alpha|major-beta|minor-beta|patch-beta|major-rc|minor-rc|patch-rc|prerelease|prerelease-alpha|prerelease-beta|prerelease-rc]"
    exit 1
    ;;
esac

# Increment version without creating a tag and a commit
if [ -n "$preid" ]; then
  npm --no-git-tag-version version "$npmVersionType" --preid="$preid" > /dev/null 2>&1 || exit 1
else
  npm --no-git-tag-version version "$npmVersionType" > /dev/null 2>&1 || exit 1
fi

# Using the package.json version
version="$(grep '"version"' package.json | cut -d'"' -f4)"

# Show version change and ask for confirmation
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Versione corrente:  $currentVersion"
echo "📦 Nuova versione:     $version"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
printf "Vuoi procedere con la release? (y/n): "
read -r confirmation

if [ "$confirmation" != "y" ] && [ "$confirmation" != "Y" ]; then
  rollback
  exit 0
fi

echo ""
echo "🧪 Procedo con i test..."
echo ""

npm audit 
if [ $? -ne 0 ]; then
  echo "🟡 Audit fallito!"
fi

npm run lint 
if [ $? -ne 0 ]; then
  echo "❌ Lint fallito!"
  rollback
  exit 1
fi

npm test
if [ $? -ne 0 ]; then
  echo "❌ Test fallito!"
  rollback
  exit 1
fi

echo ""
echo "⚙️ Procedo con la build..."
echo ""

npm run clean
if [ $? -ne 0 ]; then
  echo "❌ Clean fallito!"
  rollback
  exit 1
fi

npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build fallita!"
  rollback
  exit 1
fi

echo ""
echo "🚀 Procedo con la release di $version..."
echo ""

# Check if this is a prerelease version
isPrerelease=false
if echo "$version" | grep -qE '\-(alpha|beta|rc)'; then
  isPrerelease=true
fi

# Generate changelog from commits
npx easy-changelog --out=./CHANGELOG.md;

# Build the commit
git add package.json;
git add package-lock.json;
git add CHANGELOG.md;

git commit -m "📦 Release $version [skip ci]"

# Create an annotated tag
git tag -a "$version" -m "📦 Release $version"

# Gotta push them all
git push origin main --follow-tags;

# Publish to npm with appropriate tag
if [ "$isPrerelease" = true ]; then
  # Extract the prerelease identifier (alpha, beta, rc)
  prereleaseTag=$(echo "$version" | sed -E 's/.*-(alpha|beta|rc).*/\1/')
  echo "📦 Publishing prerelease version $version with tag: $prereleaseTag"
  npm publish --tag "$prereleaseTag"
else
  echo "📦 Publishing stable version $version"
  npm publish
fi

echo "✅ Release $version completed successfully!"