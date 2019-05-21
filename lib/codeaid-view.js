'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import Parser from './parser'

export default class CodeaidView {
  constructor (serializedState) {
    this.title = '579A - Alice in wonderland'   // Initial Dummy values
    this.time = '1 sec'
    this.memory = '256 mb'
    this.code = ''
    this.inputs = ''
    this.testCaseArray = []
    this.url = ''
    this.codeCode = ''
    this.fILEPATH = ''
    etch.initialize(this)
    // this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
    //   if (!atom.workspace.isTextEditor(item)) return
    //   message.innerHTML = `${this.title}`
    //   this.update()
    // })
  }
  render () {
    return (
      <div className='styleguide pane-item native-key-bindings' tabIndex='-1'>
        <header className='styleguide-header'>
          <atom-panel class='padded'>
            <div class='block'>
              <div class='panel-heading'>
                <label bgcolor='app-background-color'><pre>|                          CODEAID                               |</pre></label>
              </div>
              <div class='panel-body padded'>
                <textarea class='input-textarea' ref='editor' placeholder='URL:'></textarea>
              </div>
              <div class='panel-heading padded'>
                <div class='block'>
                  <div class='btn-group '>
                    <button class='btn icon icon-rocket inline-block-tight' on={{click: this.didClick}}>Go</button>
                    <button class='btn ico icon-sync inline-block-tight' on={{click: this.reload}}>Reload</button>
                    <button class='btn ico icon-file inline-block-tight' on={{click: this.createFile}}>Create</button>
                    <button class='btn ico icon-terminal inline-block-tight' on={{click: this.runTests}}>Run</button>
                    <button class='btn' on={{click: this.rereload}}>Restart</button>
                  </div>
                </div>
              </div>
            </div>
          </atom-panel>
        </header>
        <main className='styleguide-sections'>
          <div class='hello'>
            <atom-panel class='padded'>
              <div class='inset-panel'>
                <div class='panel-heading'><pre>{this.title}</pre></div>
                <div class='panel-body padded'><pre>{this.time}</pre></div>
                <div class='panel-body padded'><pre>{this.memory}</pre></div>
              </div>
            </atom-panel>
          </div>
          <div class='world'>
            <div class='block'>
              <atom-panel class='padded'>
                <div class='inset-panel' ref='test'>
                  <div class='panel-heading'>Testcases</div>
                  <div class='panel-body padded' style='overflow:scroll;'><pre>{this.inputs}</pre></div>
                </div>
              </atom-panel>
            </div>
          </div>
        </main>
        <footer className='styleguide-footer'>
          <atom-panel class='padded'>
            <div class='inset-panel'>
              <div class='panel-heading'>Copyrights @ rgkbitw </div>
            </div>
          </atom-panel>
        </footer>
      </div>
    )
  }
  rereload () {
    atom.reload()
  }

  update () {
    return etch.updateSync(this)
  }
  getTitle () {
    return 'CodeAid'
  }

  getDefaultLocation () {
    return 'right'
  }

  getURI () {
    return 'atom://codeaid'
  }

  serialize () {
    return {
      deserializer: 'codeaid/CodeaidView'
    }
  }

  destroy () {
    this.element.remove()
    this.subscriptions.dispose()
  }

  hello () {
    console.log('Hello')
  }
  getData () {
    var p = new Parser('http://codeforces.com/problemset/problem/385/C')
    var x = p.main()
    console.log(x)
  }

  printData () {
    console.log(this.data)
  }

  view () {
    this.element = document.createElement('div')
    this.element.classList.add('codeaid')
    // Create message element
    const message = document.createElement('div')
    message.textContent = this.data.toString()
    message.classList.add('message')
    this.element.appendChild(message)
  }

  getElement () {
    return this.element
  }
}
