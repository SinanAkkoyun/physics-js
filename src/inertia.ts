import { Unit, evaluate, compile, add, EvalFunction } from 'mathjs'
import { Dimension, Units } from './types/dimension'
import { onlyUnit, s, toUnit } from './util'
// formula moment of inertia and tools
// implement approximation: integral of many delta inertias of an arbitrary 2d shape / area

const f_inertia_cube_center = compile('(1/12) * m * (a^2 + b^2)')
export const inertia_cube_center = (a: Units, b: Units, m: Units): Unit => 
  calculate_eval(f_inertia_cube_center,
    {name: 'a', val: a, dim: 'm'},
    {name: 'b', val: b, dim: 'm'},
    {name: 'm', val: m, dim: 'kg'})

const f_inertia_parallel_axis = compile('I+m*d^2')
export const inertia_parallel_axis = (inertia: Units, m: Units, d: Units) =>
  calculate_eval(f_inertia_parallel_axis,
    {name: 'I', val: inertia, dim: 'kg*m^2'},
    {name: 'm', val: m, dim: 'kg'},
    {name: 'd', val: d, dim: 'm'})

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
