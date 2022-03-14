import { evaluate, unit, Unit } from "mathjs";
import { onlyLength, onlyMass, toUnit, Units } from "./util";

const materials = [
  'aluminium',
  'iron',
  'steel',
  'stainless steel',
  'formlabs resin',
  'silver',
  'gold',
  'copper',
  'chromium',
  'nickel'
] as const
type Materials = typeof materials[number]

export const density = new Map<Materials, Unit>([
  ['aluminium' , unit('2.6 g/cm^3')],
  ['iron' , unit('7.87 g/cm^3')],
  ['steel' , unit('7.86 g/cm^3')],
  ['stainless steel' , unit('7.6 g/cm^3')],
  ['formlabs resin' , unit('1.175 g/cm^3')],
  ['silver' , unit('10.5 g/cm^3')],
  ['gold' , unit('19.3 g/cm^3')],
  ['copper' , unit('8.96 g/cm^3')],
  ['chromium' , unit('7.15 g/cm^3')],
  ['nickel' , unit('8.9 g/cm^3')],
])

export const inertia_cube = (a: Units, b: Units, m: Units): Unit => {
  a = toUnit(a); b = toUnit(b); m = toUnit(m)
  onlyLength(a, b); onlyMass(m)

  return (evaluate('(1/12) * m * (a^2 + b^2)', {m,a,b}) as Unit)
}
