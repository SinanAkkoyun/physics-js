import { compile } from "mathjs"
import { Units } from "../types/dimension"
import { calculate_eval } from "../util/util"

/**
 * Returns the volume of a cylinder with the radius r and height h
 * @param r Length
 * @param h Length
 */
 export const vol_cyl = (r: Units, h: Units) => {
  return calculate_eval(f_vol_cly,
    {name: 'r', val: r, dim: 'm'},
    {name: 'h', val: h, dim: 'm'})
}
const f_vol_cly = compile('pi * r^2 * h')

/**
 * Returns the volume of a hollow cylinder with the outer radius r1, inner radius r2 and height h
 * @param r1 Length
 * @param r2 Length
 * @param h Length
 */
 export const vol_hollow_cyl = (r1: Units, r2: Units, h: Units) => {
  return calculate_eval(f_vol_hollow_cly,
    {name: 'a', val: r1, dim: 'm'},
    {name: 'b', val: r2, dim: 'm'},
    {name: 'h', val: h, dim: 'm'})
}
const f_vol_hollow_cly = compile('pi * (a^2 - b^2) * h')