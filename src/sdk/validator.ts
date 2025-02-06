import { Command, CommandSchema, Measure, MeasureSchema } from '../types'

abstract class Validator {
  static isValidCommand(command: Command): boolean {
    return CommandSchema.safeParse(command).success
  }

  static isValidMeasure(measure: Measure): boolean {
    return MeasureSchema.safeParse(measure).success
  }
}

export default Validator
