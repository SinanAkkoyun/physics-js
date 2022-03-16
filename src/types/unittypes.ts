import { Unit } from "mathjs";

export type UnitFunction = (...a: any) => Unit

export interface UnitRange {
  min: Unit,
  max: Unit,
  incr?: Unit
}