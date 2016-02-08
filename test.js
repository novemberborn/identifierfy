import test from 'ava'

import identifierfy from './'

test('prefixes reserved words with an underscore', (t) => {
  t.is(identifierfy('class'), '_class')
  t.is(identifierfy('class', { prefixInvalidIdentifiers: false }), '_class')
})

test('does not prefix reserved words with an underscore, if directed', (t) => {
  t.is(identifierfy('class', { prefixReservedWords: false }), 'class')
})

test('prefixes characters that cannot start as an identifier with an underscore', (t) => {
  t.is(identifierfy('42'), '_42')
  t.is(identifierfy('42', { prefixReservedWords: false }), '_42')
})

test('does not prefix characters that cannot start as an identifier with an underscore, if directed', (t) => {
  t.is(identifierfy('42', { prefixInvalidIdentifiers: false }), '42')
})

test('leaves good names as-is', (t) => {
  t.is(identifierfy('good'), 'good')
})

test('drops illegal characters at the front of the name, without uppercasing', (t) => {
  t.is(identifierfy('-foo'), 'foo')
})

test('drops illegal characters, uppercasing the character that follows', (t) => {
  t.is(identifierfy('foo-bar🙊baz'), 'fooBarBaz')
})

test('not all characters can be upper cased', (t) => {
  t.is(identifierfy('foo-9'), 'foo9')
})

test('returns null if no characters from the original name could be used', (t) => {
  t.is(identifierfy('💩'), null)
})
