// formula moment of inertia and tools

import { Dimension, LengthDimension, MassDimension } from "./units/dimensions";

export function inertia_cube(mass: MassDimension, a: LengthDimension): Dimension {
  return new Dimension(mass.toSI().value * a.toSI().value, 'kg*m')
}