'use babel'

export default class Parser {
  // Method 1: constructor
  // Param   : url ( string )
  // Returns : Nothing
  constructor (url) {
    console.log('Constructor Created.')
    this.url = url
  }

  // Method 2: Takes the url and parses to get useful data
  // Params  : None
  // Returns : problemJSON object
  async main () {
    return new Promise((resolve, reject) => {
      let url = this.url
      console.log(`urls ${url}`)

      // Import the Modules
      let axios = require('axios')
      let cheerio = require('cheerio')

      // Make A connection
      axios.get(url).then((response) => {
        let $ = cheerio.load(response.data)

        // Handle the ignore function
        $.fn.ignore = function (sel) {
          return this.clone().find(sel || '>*').remove().end()
        }

        // A Json Array which holds the required data
        // Header and the problem statement
        let elm = $('.header', '.problem-statement')

        // subDOM containing the sample tests
        // Returns an array
        let testcases = $('.sample-test', '.sample-tests')

        // TODO check this
        // console.log(testcases.toString())

        // store the parsed tests in array
        let tests = []
        $(testcases).each((i, b) => {
          // console.log('Doing for:', i, $(b).html().toString())
          var theRawString = $(b).html().toString()
          var out = this.process(theRawString)  // Call process function to parse this
          // console.log(out)
          tests = out
        })
        // console.log('Tests Now', tests)

        // Push the data
        let title = $(elm).children().first().text()
        let time = $(elm).children().eq(1).ignore('.property-title').text()
        let mem = $(elm).children().eq(2).ignore('.property-title').text()
        let inp = $(elm).children().eq(3).ignore('.property-title').text()
        let out = $(elm).children().eq(4).ignore('.property-title').text()
        let problem = $(elm).next().text()
        let inpSpec = $(elm).next().next().ignore('.section-title').text()
        let outSpec = $(elm).next().next().next().ignore('.section-title').text()

        let obj = {
          'title': title,
          'time': time,
          'mem': mem,
          'inp': inp,
          'out': out,
          'problem': problem,
          'inpSpec': inpSpec,
          'outSpec': outSpec,
          'tests': tests
        }
        // console.log(obj)
        // return obj
        resolve(obj)
      })
      // .then((obj) => {
      //   // TODO check this
      //   console.log('Data Should be printed here')
      //   // console.log(JSON.stringify(problemData))
      //   console.log(obj)
      //   // If everything is okay then return
      //   return obj
      .catch((error) => {
        if (error) {
          console.log('Error While Parsing.')
          reject(error)
        }
      })
    })
  }

  // Method 3: Parses the tests data and genrates a testcase object
  // Params  : theRawString = x ( string )
  // Returns : testCase object
  process (x) {
    // step 1: replace all the space tags with none
    x = x.replace(/>(\s)*</, '><')
    // create tokens
    var thetokens = []   // Holds all the tokens
    let initokens = []   // tokens on the first split
    initokens = x.split('>')

    var i = 0
    while (i !== initokens.length) {
      thetokens.push.apply(thetokens, initokens[i].split('<'))
      i = i + 1
    }
    // -----
    thetokens.push('$')
    var input = ''
    var output = ''
    var flag = 0
    let tests = []
    // console.log('Inside:the:loop:')
    for (i = 0; i < thetokens.length - 1; i++) {
      // console.log(i, thetokens[i], flag)
      if (thetokens[i] === 'pre') {
        if (flag === 0) {
          flag = 1
          continue
        } else if (flag === 2) {
          flag = 3
          continue
        }
      }
      if (thetokens[i] === '/pre') {
        if (flag === 1) {
          flag = 2
        } else if (flag === 3) {
          flag = 0
          var test = {
            inp: input,
            out: output
          }
          tests.push(test)
          input = ''
          output = ''
        }
      }
      if (thetokens[i] === 'br') {
        thetokens[i] = '\n'
      }
      if (flag === 1) {
        input = input + thetokens[i]
      }
      if (flag === 3) {
        output = output + thetokens[i]
      }
    }
    // console.log(tests)
    return tests
  }
}
