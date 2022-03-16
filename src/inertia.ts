import { Unit, evaluate, compile, add, EvalFunction } from 'mathjs'
import { Dimension, Units } from './types/dimension'
import { AxisLocation } from './types/positional'
import { calculate_eval, onlyUnit, s, toUnit } from './util/util'
// https://engineeringstatics.org/Chapter_10-moment-of-inertia-of-composite-shapes.html
// https://engineeringstatics.org/parallel-axis-theorem-section.html#MOI-table

/**
 * This will offset the axis of an object and returns the new inertia.
 * This only works when the new axis is parallel to the old one.
 * When adding multiple inertias together, keep in mind that all axes should line up.
 * @param inertia Inertia of object to be offset
 * @param m Mass
 * @param d Distance
 * @returns offset inertia
 */
export const inertia_parallel_axis = (inertia: Units, m: Units, d: Units) =>
  calculate_eval(f_inertia_parallel_axis,
    {name: 'I', val: inertia, dim: 'kg*m^2'},
    {name: 'm', val: m, dim: 'kg'},
    {name: 'd', val: d, dim: 'm'})
    const f_inertia_parallel_axis = compile('I+m*d^2')

/**
 * Returns the moment of inertia of the following cube along the axis x:
 * @example
 *      
 * +----a----+
 * |         |
 * |    x    b        I=1/12 m (a^2 + b^2)
 * |         |
 * +---------+
 * @param a Length
 * @param b Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
export const inertia_cube = (a: Units, b: Units, m: Units): Unit => 
  calculate_eval(f_inertia_cube,
    {name: 'a', val: a, dim: 'm'},
    {name: 'b', val: b, dim: 'm'},
    {name: 'm', val: m, dim: 'kg'})
const f_inertia_cube = compile('(1/12) * m * (a^2 + b^2)')

/**
 * Returns the moment of inertia of the following cylinder along the axis x:
 * @example
 *     + +
 *  +       +
 * +    x--r-+        I=1/2 m r^2
 *  +      +
 *     + +
 * 
 * @param r Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const inertia_cyl = (r: Units, m: Units): Unit => 
 calculate_eval(f_inertia_cyl,
   {name: 'r', val: r, dim: 'm'},
   {name: 'm', val: m, dim: 'kg'})
const f_inertia_cyl = compile('(1/2) * m * (r^2)')

/**
 * Returns the moment of inertia of the following cylinder along the axis x:
 * @example
 *    +++++
 *  ++     ++
 * ++   x-r1++        I=1/2 m (r1^2 + r2^2)
 *  ++     ++
 *    +++++
 * ←---r2----→
 * 
 * @param r Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const inertia_hollow_cyl = (r1: Units, r2: Units, m: Units): Unit => 
 calculate_eval(f_inertia_hollow_cyl,
   {name: 'a', val: r1, dim: 'm'},
   {name: 'b', val: r2, dim: 'm'},
   {name: 'm', val: m, dim: 'kg'})
const f_inertia_hollow_cyl = compile('(1/2) * m * (a^2 + b^2)')

/**
 * Returns the moment of inertia of the following sphere through it's center:
 * @example
 *                        ^     
 *                        |      
 *                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  
 *             ▓▓▓▓░░░░░░░░░░░░░▒▒▓▓▓▓        
 *           ▓▓▒▒░░░░░░░░░░░░░░░░░░░░░▓▓      
 *         ▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░▓▓    
 *       ▓▓▒▒▒▒░░░░░░░░░░░░░░░░░    ░░░░▒▒▓▓  
 *       ██▒▒▒▒░░░░░░░░░░░░░░░        ░░░░██  
 *     ██▓▓▒▒▒▒░░░░░░░░░░░░░░░        ░░░░░░██
 *     ██▓▓▒▒▒▒░░░░░░░░░░░░░░░░      ░░░░░░░██  I=2/3 m (r^2)
 *     ██▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░██
 *     ██▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░██
 *       ██▓▓▓▓▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░██  
 *       ██▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▒▒▒▒██  
 *         ██▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██    
 *           ██▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██      
 *             ████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████        
 *                 █████████████▓▓ 
 *                        |    
 *                        |      
 * 
 *  (if you did not know what a sphere looks like)
 * @param r Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const inertia_sphere = (r: Units, m: Units): Unit => 
 calculate_eval(f_inertia_sphere,
   {name: 'r', val: r, dim: 'm'},
   {name: 'm', val: m, dim: 'kg'})
const f_inertia_sphere = compile('(2/3) * m * (r^2)')

/**
 * Returns the moment of inertia of the following rod along it's center axis:
 * @example
 * 
 *  ===|===       I=1/12 m l^2
 *  ←--l--→
 * 
 * @param l Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const inertia_rod = (l: Units, m: Units): Unit => 
 calculate_eval(f_inertia_rod,
   {name: 'l', val: l, dim: 'm'},
   {name: 'm', val: m, dim: 'kg'})
const f_inertia_rod = compile('(1/12) * m * (l^2)')

/**
 * Returns the moment of inertia of the following rod along it's edge:
 * @example
 * 
 *     |===       I=1/3 m l^2
 *      ←l→
 * 
 * @param l Length
 * @param m Mass
 * @returns moment of inertia of a cube a,b with the mass m.
 */
 export const inertia_rod_edge = (l: Units, m: Units): Unit => 
 calculate_eval(f_inertia_rod_edge,
   {name: 'l', val: l, dim: 'm'},
   {name: 'm', val: m, dim: 'kg'})
const f_inertia_rod_edge = compile('(1/3) * m * (l^2)')