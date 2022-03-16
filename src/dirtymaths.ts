import { abs, compare, format, number, setPowerset, unit, Unit } from "mathjs";
import { Units } from "./types/dimension";
import { UnitFunction, UnitRange } from "./types/unittypes";
import { add, subtract, toUnit, u } from "./util/util";


// TODO: implement aristoteles nearing 
/**
 * Dirty solve
 * @param func Function that only takes the param x: Unit
 * @param result The value you are aiming for
 */
export function solve (func: (x: Unit) => Unit, range: UnitRange, result: Units, verbose: boolean = false) {
  result = toUnit(result) as Unit
  if(!range.incr) throw new Error('Increment in range required!')
  if(subtract(range.max, range.min).toNumber() < 0) throw new Error('Range max is smaller than range min!')

  const steps = Math.round(subtract(range.max, range.min).divide(range.incr) as unknown as number) // eww, as unknown as number

  let nearestY: Unit = undefined
  let nearestX: Unit = undefined
  for(let i=0; i<steps; i++) {
    const x = add(range.min, range.incr.multiply(unit(i.toString())))
    const y = func(x)

    if(nearestY === undefined || compare(abs(subtract(y, result)), abs(subtract(nearestY, result))) === -1){
      nearestY = y
      nearestX = x
    }

    if(verbose) console.log(`f(${format(x, {precision: 4})}) = ${format(y.to('g mm^2'), {precision: 4})}`)
  }

  console.log(`[[x=${nearestX}]] -> Nearest: ${nearestY}; Aim: ${result}`)
}