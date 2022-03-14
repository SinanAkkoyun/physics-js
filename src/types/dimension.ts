import { Unit } from "mathjs"

export interface Dimension {
  val: Units,
  name: string,
  dim: string
}

export type Units = Unit | string