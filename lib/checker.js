'use babel'
// OK Till Now :)
// TODO : Custom Test Return Logic.
// TODO : Handle the other things such as not running the parser each time if the data is already gathered.

import { File } from 'atom'
const cp = require('child_process')
const fs = require('fs')
const fl = require('file-normalize')

export default class Checker {
  constructor () {
    console.log('Checker constructed')
  }

  async runCpp (path, folder, data, i) {
    // Async Runner Return a new Promise
    return new Promise((resolve, reject) => {
      const compiler = 'g++'
      const version = '-std=c++14'
      const out = '-o'

      // Write the input to a file
      try {
        fs.writeFileSync(folder + '/inp.txt', data['inp'], 'utf-8')
      } catch (e) {
        resolve('Internal Error')
      }
      // File Written
      // Now compile the code.
      cp.execFile(compiler, [version, path], {
        cwd: folder }, (error, out, err) => {
          if (error) {
            resolve('CE ' + error)
          } else {
            // Handle the running
            var executable = 'a.exe'
            cp.exec(executable + ' <inp.txt', {cwd: folder}, (error, out, err) => {
              if (error) {
                resolve('CE ' + error)
              } else {
                let f1 = fl.normalizeNL(out)
                let f2 = data['out']
                if (f1 === f2) {
                  resolve('AC #TEST:' + i.toString() + ' ' + f1)
                } else {
                  resolve('WA #TEST:' + i.toString() + ' ' + f1)
                }
                // TODO : ADD TLE LOGIC
              }
            })
          }
        })
    })
  }

  async runPy (path, folder, data, i) {
    // Async Returns a new Promise
    return new Promise((resolve, reject) => {
      // console.log(data)

      // Write the input Data to a file.
      try {
        fs.writeFileSync(folder + '/inp.txt', data['inp'], 'utf-8')
      } catch (e) {
        // console.log('Error Writing to a file')
        resolve('Internal Error')
      }
      // console.log('File Written Successfully')

      // Run the code.
      const py = 'python '
      cp.exec(py + path + ' <inp.txt', {cwd: folder, encoding: 'utf-8'}, (error, out, err) => {
        if (error) {
          // Handle Compilation Error
          // Returns CE Verdict
          resolve('CE ' + error)
        } else {
          // Handle the running.

          // console.log('Ran Successfully')
          let f1 = fl.normalizeNL(out)
          let f2 = data['out']
          // console.log(f1)
          // console.log(f2)
          if (f1 === f2) {
            resolve('AC #TEST:' + i.toString() + ' ' + f1)
          } else {
            resolve('WA #TEST:' + i.toString() + ' ' + f1)
          }
          // TODO : Add TLE logic
        }
      })
    })
  }
  // Handle the file and run apt method
  async runner (path, folder, data, i) {
    return new Promise((resolve, reject) => {
      if (path.endsWith('py')) {
        resolve(this.runPy(path, folder, data, i))
      } else if (path.endsWith('cpp')) {
        resolve(this.runCpp(path, folder, data, i))
      } else {
        // Handle Unknown Language Fromat
        resolve('Not Done Yet')
      }
    })
  }
}
