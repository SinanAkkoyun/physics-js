import { inertia_cube, inertia_cube_edge, inertia_parallel_axis } from './inertia'
import { mass } from './mass'
import { s } from './util/util'

// POV arm inertia

const hollow = mass('3', 'formlabs resin')
const i = inertia_cube_edge('1.8mm', mass('1.8*2.2*1 mm^3', 'formlabs resin')) + 