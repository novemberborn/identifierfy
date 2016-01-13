import { keyword } from 'esutils'

// Follow Babel's implementation:
// <https://github.com/babel/babel/blob/add96d626d98133e26f62ec4c2aeee655bed069a/packages/babel-types/src/validators.js#L153:L164>
function isValidIdentifier (name) {
  return !keyword.isReservedWordES6(name, true) && keyword.isIdentifierNameES6(name)
}

// Rewrite the name until it forms a valid identifier.
export default function identifierfy (name) {
  // Start with a valid character. This way if the first character in the name
  // is not allowed to be used as the first character it can be prefixed with
  // an underscore, without having to be dropped. The same goes for if the name
  // is a reserved word.
  let intermediate = '_'

  // Flag whether the previous character was invalid (and thus dropped).
  let prevWasInvalid = false

  // Use for/of to iterate over the code points. This way surrogate pairs can
  // be avoided.
  for (let char of name) {
    // Try to uppercase the immediately following (not all characters have an
    // case equivalent though). Ignore if the dropped character was at the front
    // of the name.
    if (prevWasInvalid && intermediate !== '_') {
      char = char.toUpperCase()
    }

    // Only include characters if the name remains valid.
    if (isValidIdentifier(intermediate + char)) {
      intermediate += char
      prevWasInvalid = false
    } else {
      prevWasInvalid = true
    }
  }

  // Return `null` if no characters from the original name survive the process.
  if (intermediate === '_') return null

  // If the name is valid without the underscore prefix return it as such,
  // otherwise retain it.
  const withoutPrefix = intermediate.slice(1)
  return isValidIdentifier(withoutPrefix) ? withoutPrefix : intermediate
}
