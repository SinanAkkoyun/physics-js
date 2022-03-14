import { format, unit } from 'mathjs'
import { inertia_cube_center, inertia_parallel_axis } from './inertia'
import { s } from './util'

const a = inertia_cube_center('2mm', '3mm', '3g')
const res = inertia_parallel_axis(a, '3g', '5mm')

console.log(s(a))
console.log(s(res))