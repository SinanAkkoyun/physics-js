// SI Einheiten
import * as util from 'util'
import { isUint8Array } from "util/types"
import { dimensionToSI, getSIPrefix } from './util/util'

export type siPrefixes = 'y' | 'z' | 'a' | 'f' | 'p' | 'n' | 'u' | 'm' | 'c' | 'd' | 'da' | 'h' | 'k' | 'M' | 'G' | 'T'
export const siPrefixesLUT = new Map<siPrefixes, number>([
  ['y', 1e-24],
  ['z', 1e-21],
  ['a', 1e-18],
  ['f', 1e-15],
  ['p', 1e-12],
  ['n', 1e-9],
  ['u', 1e-6],
  ['m', 1e-3],
  ['c', 1e-2],
  ['d', 1e-1],
  ['da', 1e+1],
  ['h', 1e+2],
  ['k', 1e+3],
  ['M', 1e+6],
  ['G', 1e+9],
  ['T', 1e+12]
])

export type siUnits = 'kg' | 'm'
export const SIUnits = ['kg', 'm']

export interface SIDimension {
  value: number,
  unit: string // Oh no, any
}

export class Dimension { // Need to implement composites
  constructor (public value: number, public unit: string) { // Oh no, any 
  }

  [util.inspect.custom](depth, opts) {
    return `${this.value} ${this.unit}`
  }
}

export type mass = 'g'
export class MassDimension extends Dimension {
  constructor(public value: number, public unit: `${siPrefixes| ''}${mass}`) {
    super(value, unit)
  }
  public toSI(): SIDimension {
    const prefix = getSIPrefix(this.unit)
    const value = this.value * (prefix ? siPrefixesLUT.get(prefix) : 1) * 0.001

    return {value, unit: 'kg'} // g to kg => 0,001
  }
}

export type length = 'm'
export class LengthDimension extends Dimension {
  constructor(public value: number, public unit: `${siPrefixes| ''}${length}`) {
    super(value, unit)
  }
  public toSI(): SIDimension {
    return dimensionToSI(this.value, this.unit)
  }
}
