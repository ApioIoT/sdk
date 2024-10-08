#!/bin/sh
# Increments the project version (e.g. from 2.3.0 to 2.4.0)
# It handles stuff like
# * CHANGELOG
# * NPM package version
# * Git tags


# Calculating the new version requires to know which kind of update this is
# The default version increment is patch
# Used values: major|minor|patch where in x.y.z :
# major=x
# minor=y
# patch=z

if [ -z "$1" ]
then
  versionType="patch"
else
  versionType=$1
fi

# Increment version without creating a tag and a commit (we will create them later)
npm --no-git-tag-version version $versionType || exit 1

# Using the package.json version
version="$(grep '"version"' package.json | cut -d'"' -f4)"

# Generate changelog from commits
npx easy-changelog --out=./CHANGELOG.md;

# Build the commit
git add package.json;
git add package-lock.json;
git add CHANGELOG.md;

git commit -m "📦 Release $version [skip ci]"

# Create an annotated tag
git tag -a $version -m "📦 Release $version"

# Gotta push them all
git push origin main --follow-tags;

npm publish