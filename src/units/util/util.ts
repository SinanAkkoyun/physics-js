import { SIDimension, siPrefixes, siPrefixesLUT } from "../dimensions"

export function getSIPrefix (unit: string): siPrefixes | undefined {
  let chosenPrefix: siPrefixes | undefined = undefined
  for(const prefix of siPrefixesLUT.keys()) {
    if(unit.startsWith(prefix) && (chosenPrefix ? chosenPrefix.length < prefix.length : true)) { // bad thought out solution regarding character superposition
      if(unit.length > prefix.length)
        chosenPrefix = prefix
    }
  }
  return chosenPrefix
}

export function dimensionToSI (ivalue: number, iunit: string): SIDimension { // Oh no, any
  const prefix = getSIPrefix(iunit)
  const value = ivalue * (prefix ? siPrefixesLUT.get(prefix) : 1)
  const unit = prefix && iunit.startsWith(prefix) ? iunit.slice(prefix.length) : iunit

  // "Recursively" check if every non operator character is an SI unit

  return {value, unit} // g to kg => 0,001
}