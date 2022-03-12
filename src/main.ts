import { inertia_cube } from "./inertia";
import { LengthDimension, MassDimension } from "./units/dimensions";

const res = inertia_cube(new MassDimension(2, 'mg'), new LengthDimension(0.2, 'um'))

console.log(res)