import { evaluate, Unit, unit } from 'mathjs'
import { solve } from './dirtymaths'
import { inertia_cube, inertia_cube_edge, inertia_hollow_cyl, inertia_parallel_axis } from './inertia'
import { mass } from './mass'
import { add, s, u } from './util/util'
import { vol_hollow_cyl } from './volume'

// POV arm inertia
const armMass = mass(vol_hollow_cyl('4mm/2', '3mm/2', '1mm'), 'formlabs resin')
const bearingMass = mass(vol_hollow_cyl('3mm/2', '1mm/2', '1mm'), 'stainless steel') // inaccurate
const inertia = add(inertia_parallel_axis(inertia_hollow_cyl('3mm/2', '1mm/2', bearingMass), '3.63mm', bearingMass),
                    add(inertia_cube_edge('1.8mm', mass('1.8mm * 2.2mm * 1mm', 'formlabs resin')),
                        inertia_parallel_axis(inertia_hollow_cyl('4mm/2', '3mm/2', armMass), '3.63mm', armMass))).to('g mm^2')

console.log(`arm inertia: ${s(inertia.to('g mm^2'))}`)

// Next: implement 3d shapes and calc inertia with them, like new Cube(3mm,1mm,2mm).inertia or something

const counterMass = mass(u('4mm*3mm*1.5mm'), 'stainless steel')
solve((x: Unit) => inertia_parallel_axis(inertia_cube('4mm', '3mm', counterMass), x, counterMass), {
  max: u('20mm'),
  min: u('1mm'),
  incr: u('10um')
}, inertia)
