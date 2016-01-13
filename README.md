# identifierfy

Rewrites an identifier string so its valid according to ES2015. Tested with
Node.js 0.10 and above.

Please see [this awesome article by Mathias
Bynens](https://mathiasbynens.be/notes/javascript-identifiers-es6) for
background.

## Installation

```
npm install --save identifierfy
```

## Usage

The module has one default export, the `identifierfy` function:

```js
var identifierfy = require('identifierfy')
```

Call `identifierfy()` with an identifier string. It'll return a string that can
be used as an identifier, which is useful when [writing Babel
plugins](https://github.com/thejameskyle/babel-plugin-handbook).

Characters that are not allowed in identifiers are dropped. Any character that
follows a removed character is uppercased, except if the dropped character was
at the front of the string.

If necessary the resulting identifier is prefixed with an underscore. This will
happen if the string is a reserved word or if the first character cannot be used
as the first character (but is fine as the second character).

Note that `null` is returned if all characters from the original string are
dropped.

## Examples

Input|Resulting identifier|Reason
:---|:---|:---
`'class`|`'_class'`|Reserved word
`'42'`|`'_42'`|Identifiers cannot start with a number
`'-foo'`|`'foo'`|The `-` is dropped, but since it's as the front `f` is not uppercased
`'foo-bar🙊baz'`|`'fooBarBaz'`|The `-` and `🙊` characters are dropped, and the following characters uppercased
`'foo-9'`|`foo9`|`9` can't be uppercased of course 😉
`'💩'`|`null`|Sadly emojis cannot be used as identifiers 😢
