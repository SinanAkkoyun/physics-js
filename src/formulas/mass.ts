import { compile, evaluate, unit, Unit } from "mathjs";
import { Units } from "../types/dimension";
import { add, onlyUnit, toUnit, calculate_eval, validate_dimension, validate_dimensions, validate_units, validate_units_arr, u } from "../util/util";

const materials = [
  'aluminium',
  'iron',
  'steel',
  'stainless steel',
  'formlabs resin',
  'silver',
  'gold',
  'copper',
  'chromium',
  'nickel'
] as const
type Material = typeof materials[number]

export const density = new Map<Material, Unit>([
  ['aluminium' , unit('2.6 g/cm^3')],
  ['iron' , unit('7.87 g/cm^3')],
  ['steel' , unit('7.86 g/cm^3')],
  ['stainless steel' , unit('7.6 g/cm^3')],
  ['formlabs resin' , unit('1.175 g/cm^3')],
  ['silver' , unit('10.5 g/cm^3')],
  ['gold' , unit('19.3 g/cm^3')],
  ['copper' , unit('8.96 g/cm^3')],
  ['chromium' , unit('7.15 g/cm^3')],
  ['nickel' , unit('8.9 g/cm^3')],
])

/**
 * Returns the mass of an object with the volume vol and material mat / density dens.
 * Either supply a material or density.
 * @param vol Volume
 * @param mat Material or Density
 */
export const mass = (vol: Units, mat?: Material, dens?: Units): Unit => {
  let uDens: Unit
  if(mat) uDens = density.get(mat)
  if(dens) uDens = onlyUnit('g/cm^3')(toUnit(dens))

  if(!uDens) throw new Error('Density was not supplied')

  return calculate_eval(f_mass,
    {name: 'p', val: uDens, dim: 'g/cm^3'},
    {name: 'v', val: vol, dim: 'cm^3'})
}
const f_mass = compile('p*v')

/**
 * Returns the center of mass on a one dimensional axis.
 * @param obj Object containing m: Mass and d: Distance
 * @returns Center of mass
 */
 export const center_of_mass = (...obj: {m: Units, d: Units}[]): Unit => {
  const objects = obj.map(object => {
    validate_units(object.m)
    validate_units(object.d)
    object.m = u(object.m)
    object.d = u(object.d)
    return object
  }) as {m: Unit, d: Unit}[]

  let sumMD = u('0 kg m')
  let sumM = u('0 kg')
  objects.map((object) => {
    sumMD = add(sumMD, object.m.multiply(object.d))
    sumM = add(sumM, object.m)
  })

  return sumMD.divide(sumM)
}