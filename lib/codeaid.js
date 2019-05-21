'use babel'

import CodeaidView from './codeaid-view'
import Parser from './parser'
import Checker from './checker'
import { File, CompositeDisposable, Disposable } from 'atom'
const cp = require('child_process')
const path = require('path')

export default {

  subscriptions: null,

  activate (state) {
    this.title = 'Hello World'
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      // Add an opener
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://codeaid') {
          return new CodeaidView()
        }
      }),

      atom.commands.add('atom-workspace', {
        'codeaid:toggle': () => this.toggle()
      }),

      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof CodeaidView) {
            item.destroy()
          }
        })
      })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  toggle () {
    atom.workspace.toggle('atom://codeaid')
    // // Toggle Function So far.
    // console.log('Codeaid was toggled!')
    // let view = this.codeaidView
    //
    // let paths = atom.workspace.getActiveTextEditor().getPath()
    // console.log(paths)
    // let dir = path.dirname(paths)
    // let url = atom.workspace.getActiveTextEditor().getSelectedText()
    // let p = new Parser('http://codeforces.com/problemset/problem/385/C')
    // Test Function to test the other classes.
    // async function test () {
      // if (this.data === '') {
    //     // console.log('Fetching Data')
    //     // this.data = await p.main() // Received the JSON data.
    //   // }
      // let data = await p.main()
      // console.log(data)

    //   view.data = data
    //   console.log(view.data)
    //   view.view()
    //   panel['visible'] = true
    //   panel['item'] = view.getElement()
    //   // // Start checker
    //   // let q = new Checker()
    //   // let outdata = ''
    //   // for (var i = 0; i < data['tests'].length; ++i) {
    //   //   console.log('Running Test:', i + 1)
    //   //
    //   //   let obj = { 'inp': data['tests'][i]['inp'], 'out': data['tests'][i]['out'] }
    //   //   outdata = await q.runner(paths, dir, obj, i)
    //   //   console.log(outdata)
    //   //   let ver = outdata.substr(0, 2)
    //   //   if (ver === 'AC') {
    //   //     atom.notifications.addSuccess(outdata)
    //   //   } else if (ver === 'CE') {
    //   //     atom.notifications.addError(outdata)
    //   //     break
    //   //   } else if (ver === 'WA') {
    //   //     atom.notifications.addError(outdata)
    //   //     break
    //   //   } else if (outdata === 'Internal Error') {
    //   //     atom.notifications.addError(outdata + '\nPlease Try Again')
    //   //     break
    //   //   }
    //   // }
    // }
    // test()
  },

  deserializeCodaidView (serialized) {
    return new CodeaidView()
  }
}
