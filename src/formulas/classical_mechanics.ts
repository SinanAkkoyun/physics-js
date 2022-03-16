import { compile, Unit } from "mathjs"
import { Units } from "../types/dimension"
import { calculate_eval } from "../util/util"

/**
 * Calculates the centrifugal force.
 * @param m Mass
 * @param w 1/Time
 * @param r Length
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const centrifugal_force = (m: Units, w: Units, r: Units): Unit => 
 calculate_eval(f_centrifugal_force,
   {name: 'm', val: m, dim: 'kg'},
   {name: 'w', val: w, dim: '1/s'},
   {name: 'r', val: r, dim: 'm'})
const f_centrifugal_force = compile('m * w^2 * r')