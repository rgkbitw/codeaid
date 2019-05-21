import Parser from './parser.js'

let url = 'http://codeforces.com/problemset/problem/1/A'

var p = new Parser(url)

console.log(p.url)
let output = p.main()
console.log('Printing the output\n')
console.log(output)
