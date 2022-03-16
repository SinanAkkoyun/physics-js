import { BigNumber, EvalFunction, format, FormatOptions, Fraction, MathJSON, unit, Unit, UnitComponent } from "mathjs";
import { Dimension } from "../types/dimension";

export const toUnit = (u: Unit | string) => {
  if(typeof(u) === 'string') return unit(u)
  return u
}

export const onlyUnit = (unitString: string) => (u: Unit) => { if (!u.equalBase(unit(unitString))) throw new Error(unitString); return u }

export const s = (u: Unit) => format(u, {precision: 14})
export const u = (unitString: string): Unit => unit(unitString)

export const calculate_eval = (evalFunction: EvalFunction, ...d: Dimension[]) => {
  const dimensions = d.map((dimension): Dimension => {
    dimension.val = toUnit(dimension.val) as Unit
    onlyUnit(dimension.dim)(dimension.val)
    return dimension
  })

  let scope = {}
  for(const dimension of dimensions) {
    if(dimension.name && dimension.val) scope[dimension.name] = dimension.val
  }
  
  return evalFunction.evaluate(scope)
}