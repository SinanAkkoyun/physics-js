import { evaluate, unit } from 'mathjs'
import { inertia_cube, inertia_cube_edge, inertia_hollow_cyl, inertia_parallel_axis } from './inertia'
import { mass } from './mass'
import { add, s } from './util/util'
import { vol_hollow_cyl } from './volume'

// POV arm inertia
const armMass = mass(vol_hollow_cyl('4mm', '3mm', '1mm'), 'formlabs resin')
const bearingMass = mass(vol_hollow_cyl('3mm', '1mm', '1mm'), 'steel') // inaccurate
const inertia = add(inertia_parallel_axis(inertia_hollow_cyl('3mm', '1mm', bearingMass), '3.63mm', bearingMass),
                    add(inertia_cube_edge('1.8mm', mass('1.8mm * 2.2mm * 1mm', 'formlabs resin')),
                        inertia_parallel_axis(inertia_hollow_cyl('4mm', '3mm', armMass), '3.63mm', armMass))).to('g mm^2')

console.log(`arm inertia: ${s(inertia.to('g mm^2'))}`)