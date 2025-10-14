[//]: # (TITLE Parsing)
[//]: # (ENDPOINT /parsing)

# Parsing

Lexer -> Tokenization program -> transformation of a stream of characters into a meaningful array of tokens. Used to produce an AST.

Input -> let nums = [A, 20, 30];
Output -> [let][symbol][eq][bracket][symbol][…]

Abstract Syntax Tree (AST)
An AST is a data-structure which represents the program's structure. AST's are easy to traverse and have many uses

-> Parses a file, outtputs metadata and html representation

## Token struct that holds value and kind (ienum)
￼
symbols
+ reserved keywords
+ comments
+ balises commentaires changement de langue + html markup
-> make kind a regex? Ou const?

token kind -> enum matches to its string representation

debug fct
-> if token is string/identifier/number print tokenKind rep + value
-> else print tokenKind rep

## Lexer struct

- tokens: token[]
- source: str
- pos: int
- patterns: regaexpPattern[]

createLexer function (source:str) that returns a pointer to a lexer obj
initialized at
- token: [],
- source: source,
- pos: 0
- patterns: [
  // all patterns supported to recognize the symbols and their handler functions
  { regex, defaultHandler(TOKEN, stringRep) }
]

--> pattern order matters (ex: match eq(==) before assignment(=))

### default handler

for tokens that dont have a value associated

returns a fct that:
- advances the position of input lexer by length of input string
- push new tokenKind and value to tokens

### specialized handler

for string/identifier/number - types that hold a value

- grab the matching string
- advances the position of input lexer by length of match string

### helper fcts

- advances lex.pos
- pushes to lex.tokens
- returns char @ lex.source[lex.pos]
- returns remainder lex.source[lex.pos:]
- at_eod lex.pos >= lex.source.len


## regexpPattern struct
- regex: *regexp
- handler: regexHandler

## regexHandler

function (lex: *lexer, regex: *regexp)
returns a lex for a regex

## tokenize fct

function (source: str): []Token
- create lexer with input source
- while not eof
  iterate through lex.patterns to match first char
  if match -> call pattern.handler, push EOF token to lex.tokens and return lex.tokens
  if !match panic(unrecognized token near lex.remainder())