import test from 'ava'

import identifierfy from './'

test('prefixes reserved words with an underscore', t => {
  t.is(identifierfy('class'), '_class')
})

test('prefixes characters that cannot starts an identifier with an underscore', t => {
  t.is(identifierfy('42'), '_42')
})

test('drops illegal characters at the front of the name, without uppercasing', t => {
  t.is(identifierfy('-foo'), 'foo')
})

test('drops illegal characters, uppercasing the character that follows', t => {
  t.is(identifierfy('foo-bar🙊baz'), 'fooBarBaz')
})

test('not all characters can be upper cased', t => {
  t.is(identifierfy('foo-9'), 'foo9')
})

test('returns null if no characters from the original name could be used', t => {
  t.is(identifierfy('💩'), null)
})
