import { evaluate, Unit, unit } from 'mathjs'
import { integrate_over_shapes } from './dirty/dirtyintegral'
import { solve } from './dirty/dirtymaths'
import { inertia_cube, inertia_cube_edge, inertia_hollow_cyl, inertia_parallel_axis, center_of_mass, mass, vol_hollow_cyl, centrifugal_force } from './formulas'
import { Cube, ShapeObject } from './types/shapes'
import { add, s, subtract, u } from './util'

// POV arm inertia
const blockMass = mass('1.8mm * 2.2mm * 1mm', 'formlabs resin')
const cylMass = mass(vol_hollow_cyl('4mm/2', '3mm/2', '1mm'), 'formlabs resin')
const bearingMass = mass(vol_hollow_cyl('3mm/2', '1mm/2', '1mm'), 'stainless steel') // inaccurate
const inertiaArm = add(inertia_parallel_axis(inertia_hollow_cyl('3mm/2', '1mm/2', bearingMass), '3.63mm', bearingMass),
                add(inertia_parallel_axis(inertia_cube('2.2mm', '1.8mm', blockMass), '1.8mm/2', blockMass),
                inertia_parallel_axis(inertia_hollow_cyl('4mm/2', '3mm/2', cylMass), '3.63mm', cylMass))).to('g mm^2')
const comArm = center_of_mass({m: cylMass, d: '3.63mm'},
                              {m: bearingMass, d: '3.63mm'},
                              {m: blockMass, d: '1.8mm/2'})

console.log(`arm inertia: ${s(inertiaArm.to('g mm^2'))}`)

// Next: implement 3d shapes and calc inertia with them, like new Cube(3mm,1mm,2mm).inertia or something

const counterMass = mass(u('4mm*3mm*1mm'), 'stainless steel')
const distance = solve((x: Unit) => inertia_parallel_axis(inertia_cube('4mm', '3mm', counterMass), x, counterMass), {
  max: u('20mm'),
  min: u('1mm'),
  incr: u('10um')
}, inertiaArm)

console.log(`\n\nCoM sys (moment of inertia balance): ${center_of_mass({m: counterMass, d: distance.multiply(u('-1'))},
                           {m: add(add(cylMass, bearingMass), blockMass), d: comArm})}\n | CoM arm: ${comArm}`)

console.log(`Centrifugal balance: ${subtract(add(add(cylMass, bearingMass), blockMass).multiply(comArm), counterMass.multiply(distance)).to('g um')}`)

const centrifugeCenter = solve((x: Unit) => subtract(add(add(cylMass, bearingMass), blockMass).multiply(comArm), counterMass.multiply(x)).to('g mm'), {
  max: u('20mm'),
  min: u('1mm'),
  incr: u('10um')
}, u('0g mm'))

console.log(`\n\nCoM sys (centrifugal equality): ${center_of_mass({m: counterMass, d: centrifugeCenter.multiply(u('-1'))},
                           {m: add(add(cylMass, bearingMass), blockMass), d: comArm})}\n`)

console.log('\n\n\n\n')

// I just proved that integrating over an area with a linear distance correlation is the same as just clasically using the center of mass -.- (yayy)
console.log(`CentrifugalForce: ${centrifugal_force('5kg', '1 s^-1', '6m')}
IntegralCentrifugalForce: ${integrate_over_shapes(new ShapeObject(new Cube(u('4m'), u('4m'), {x: u('-1m'), y: u('6m - 4m / 2')}), u('5kg')),
                                                  new ShapeObject(new Cube(u('4m'), u('4m'), {x: u('-1m'), y: u('8m - 4m / 2')}), u('5kg')))}`)