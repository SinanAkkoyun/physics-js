import { BigNumber, format, FormatOptions, Fraction, MathJSON, unit, Unit, UnitComponent } from "mathjs";

export const toUnit = (u: Unit | string) => {
  if(typeof(u) === 'string') return unit(u)
  return u
}

export const onlyUnit = (unitString: string) => (u: Unit) => { if (!u.equalBase(unit(unitString))) throw new Error(unitString) }

// export const onlyMass = (...u: Unit[]) => u.map(onlyUnit('kg'))
// export const onlyLength = (...u: Unit[]) => u.map(onlyUnit('m'))
// export const onlyInertia = (...u: Unit[]) => u.map(onlyUnit('kg * m^2'))

export const s = (u: Unit) => format(u, {precision: 14})
export const u = (unitString: string): Unit => unit(unitString)