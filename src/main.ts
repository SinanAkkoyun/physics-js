import { evaluate, Unit, unit } from 'mathjs'
import { solve } from './dirtymaths'
import { inertia_cube, inertia_cube_edge, inertia_hollow_cyl, inertia_parallel_axis } from './formulas/inertia'
import { center_of_mass, mass } from './formulas/mass'
import { vol_hollow_cyl } from './formulas/volume'
import { add, s, subtract, u } from './util/util'

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

const counterMass = mass(u('4mm*3mm*1.5mm'), 'stainless steel')
const distance = solve((x: Unit) => inertia_parallel_axis(inertia_cube('4mm', '3mm', counterMass), x, counterMass), {
  max: u('20mm'),
  min: u('1mm'),
  incr: u('10um')
}, inertiaArm)

console.log(`CoM sys: ${center_of_mass({m: counterMass, d: distance.multiply(u('-1'))},
                           {m: add(add(cylMass, bearingMass), blockMass), d: comArm})} | CoM arm: ${comArm}`)

console.log(`Centrifugal balance: ${subtract(add(add(cylMass, bearingMass), blockMass).multiply(comArm), counterMass.multiply(distance)).to('g um')}`)
console.log(`Balance: ${solve((x: Unit) => subtract(add(add(cylMass, bearingMass), blockMass).multiply(comArm), counterMass.multiply(x)).to('g mm'), {
  max: u('20mm'),
  min: u('1mm'),
  incr: u('10um')
}, u('0g mm'))}`)

console.log(`plastic: ${add(blockMass, cylMass)} | bearing: ${bearingMass}`)