import { BigNumber, EvalFunction, evaluate, format, FormatOptions, Fraction, MathJSON, unit, Unit, UnitComponent } from "mathjs";
import math = require("mathjs");
import { Dimension, Units } from "../types/dimension";

export const add = (a: Unit, b: Unit): Unit => math.add(a, b) as Unit
export const subtract = (a: Unit, b: Unit): Unit => math.subtract(a, b) as Unit

export const toUnit = (u: Units) => {
  try {
    if(typeof(u) === 'string') return unit(u)
    return u
  } catch (err) {
    if(err instanceof SyntaxError) {
      return evaluate(u.toString())
    }
  }
}

export const onlyUnit = (unitString: string) => (u: Unit) => { if (!u.equalBase(unit(unitString))) throw new Error(unitString); return u }

export const s = (u: Unit) => format(u, {precision: 14}) // precision: 14
export const u = (unitString: Units): Unit => toUnit(unitString)

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