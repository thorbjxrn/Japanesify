import { browser } from 'webextension-polyfill-ts'
import path from 'path'
import * as fs from 'fs';
import * as ContentScript from '../../../source/ContentScript/index'
import { defaultJapanesifyState } from '../../../source/utils/utils';

describe('Content Script', () => {
    const convertText = ContentScript.convertText
    const convertSpy = jest.spyOn(ContentScript, 'convertText')

    beforeEach(() => {
        convertSpy.mockClear()
        document.body.innerHTML = ''
    })
    
    test('sets textContent to empty string if null', () => {
        const text = document.createTextNode("div");
        text.textContent = null
        convertText(text, {enabled: true, n: true, a: true})

        expect(text.textContent).toBe('')
    })

    test('adds message listener', async () => {
        expect(browser.runtime.onMessage.addListener).toBeCalled()
    })

    test('executes convertText when new nodes get added', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        
        // Since convertText is called recursively it has 7 executions by the time
        // this expect ie reached.
        expect(convertSpy).toBeCalledTimes(7)
        
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"

        // await does seem to do something ¯\_(ツ)_/¯
        await document.body.appendChild(newDiv)
        
        // convertText is executed 2 more times once for the div
        // another for the text node.
        expect(convertSpy).toBeCalledTimes(9)
    })

    test('does Not converts roman character n to hiragana ん if not enabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('does Not call convertText if no checkBox is selected', () => {        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('calls convertText if enabled and あ checkbox is clicked', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})

        expect(convertSpy).toBeCalledTimes(2)
    })
    
    test('does not call convert if hiragana character not enabled', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('converts hiragana character n to ん and back if extension gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).toContain('ん')
        expect(document.body.textContent).not.toContain('n')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})
        expect(document.body.textContent).not.toContain('ん')
        expect(document.body.textContent).toContain('n')
    })

    test('converts a syllables to hiragana characters and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain('a')
        expect(document.body.textContent).not.toContain('kあ')
        expect(document.body.textContent).not.toContain('sあ')
        expect(document.body.textContent).not.toContain('tあ')
        expect(document.body.textContent).not.toContain('nあ')
        expect(document.body.textContent).not.toContain('hあ')
        expect(document.body.textContent).not.toContain('mあ')
        expect(document.body.textContent).not.toContain('yあ')
        expect(document.body.textContent).not.toContain('rあ')
        expect(document.body.textContent).not.toContain('wあ')
        expect(document.body.textContent).toContain('あ')
        expect(document.body.textContent).toContain('か')
        expect(document.body.textContent).toContain('さ')
        expect(document.body.textContent).toContain('た')
        expect(document.body.textContent).toContain('な')
        expect(document.body.textContent).toContain('は')
        expect(document.body.textContent).toContain('ま')
        expect(document.body.textContent).toContain('や')
        expect(document.body.textContent).toContain('ら')
        expect(document.body.textContent).toContain('わ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        expect(document.body.textContent).toContain('a')
        expect(document.body.textContent).toContain('ka')
        expect(document.body.textContent).toContain('sa')
        expect(document.body.textContent).toContain('ta')
        expect(document.body.textContent).toContain('na')
        expect(document.body.textContent).toContain('ha')
        expect(document.body.textContent).toContain('ma')
        expect(document.body.textContent).toContain('ya')
        expect(document.body.textContent).toContain('ra')
        expect(document.body.textContent).toContain('wa')
        expect(document.body.textContent).not.toContain('あ')
        expect(document.body.textContent).not.toContain('か')
        expect(document.body.textContent).not.toContain('さ')
        expect(document.body.textContent).not.toContain('た')
        expect(document.body.textContent).not.toContain('な')
        expect(document.body.textContent).not.toContain('は')
        expect(document.body.textContent).not.toContain('ま')
        expect(document.body.textContent).not.toContain('や')
        expect(document.body.textContent).not.toContain('ら')
        expect(document.body.textContent).not.toContain('わ')
    })
    
    test('converts hiragana character ん to n if checkbox gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: false})
        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('converts a syllables to hiragana characters and back if a checkbox gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain('a')
        expect(document.body.textContent).not.toContain('kあ')
        expect(document.body.textContent).not.toContain('sあ')
        expect(document.body.textContent).not.toContain('tあ')
        expect(document.body.textContent).not.toContain('nあ')
        expect(document.body.textContent).not.toContain('hあ')
        expect(document.body.textContent).not.toContain('mあ')
        expect(document.body.textContent).not.toContain('yあ')
        expect(document.body.textContent).not.toContain('rあ')
        expect(document.body.textContent).not.toContain('wあ')
        expect(document.body.textContent).toContain('あ')
        expect(document.body.textContent).toContain('か')
        expect(document.body.textContent).toContain('さ')
        expect(document.body.textContent).toContain('た')
        expect(document.body.textContent).toContain('な')
        expect(document.body.textContent).toContain('は')
        expect(document.body.textContent).toContain('ま')
        expect(document.body.textContent).toContain('や')
        expect(document.body.textContent).toContain('ら')
        expect(document.body.textContent).toContain('わ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain('あ')
        expect(document.body.textContent).not.toContain('か')
        expect(document.body.textContent).not.toContain('さ')
        expect(document.body.textContent).not.toContain('た')
        expect(document.body.textContent).not.toContain('な')
        expect(document.body.textContent).not.toContain('は')
        expect(document.body.textContent).not.toContain('ま')
        expect(document.body.textContent).not.toContain('や')
        expect(document.body.textContent).not.toContain('ら')
        expect(document.body.textContent).not.toContain('わ')
        expect(document.body.textContent).toContain('a')
        expect(document.body.textContent).toContain('ka')
        expect(document.body.textContent).toContain('sa')
        expect(document.body.textContent).toContain('ta')
        expect(document.body.textContent).toContain('na')
        expect(document.body.textContent).toContain('ha')
        expect(document.body.textContent).toContain('ma')
        expect(document.body.textContent).toContain('ya')
        expect(document.body.textContent).toContain('ra')
        expect(document.body.textContent).toContain('wa')
    })

    test('Should not convert script tag contents', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'excludedElements.html'), 'utf8')
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})

        expect(document.body.textContent).toContain('[].push(\'text with an n\');')
    })

    test('Should not convert style tag contents', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'excludedElements.html'), 'utf8')
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})

        expect(document.body.textContent).toContain('.mw-editfont-monospace{font-family:monospace,monospace}')
    })
})
