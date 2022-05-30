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

    test('converts n to ん', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"
        convertText(newDiv, {enabled:true, n: true, a: false})

        expect(newDiv.textContent).not.toContain('n')
        expect(newDiv.textContent).toContain('ん')
    })
    
    test('converts ん to n', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to coんvert to Japanese"
        convertText(newDiv, {enabled:true, n: false, a: false})

        expect(newDiv.textContent).not.toContain('ん')
        expect(newDiv.textContent).toContain('n')
    })
    
    test('converts a to あ', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"
        convertText(newDiv, {enabled:true, n: false, a: true})

        expect(newDiv.textContent).not.toContain('a')
        expect(newDiv.textContent).toContain('あ')
    })
    
    test('converts あ to a', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sあmple text to convert to Jあpあnese"
        convertText(newDiv, {enabled:true, n: false, a: false})

        expect(newDiv.textContent).not.toContain('あ')
        expect(newDiv.textContent).toContain('a')
    })

    test('does not converts n to ん', () => {
        const newDiv = document.createElement("div");
        newDiv.innerText = "Sample text to convert to Japanese"
        convertText(newDiv, {enabled: true, n: false, a: false})

        expect(newDiv.innerText).toContain('n')
        expect(newDiv.innerText).not.toContain('ん')
    })
    
    test('does not converts n to ん', () => {
        const text = document.createTextNode("div");
        text.textContent = null
        convertText(text, {enabled: true, n: false, a: false})

        expect(text.textContent).toBe('')
    })

    test('adds message listener', async () => {
        expect(browser.runtime.onMessage.addListener).toBeCalled()
    })

    test('converts roman character n to hiragana ん when enabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        
        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
    })

    test('converts n to ん when enabled on new nodes that get added', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})

        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"

        // await does seem to do something ¯\_(ツ)_/¯
        await document.body.appendChild(newDiv)
        
        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
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
    
    test('calls convertText if あ checkbox is clicked', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})

        expect(convertSpy).toBeCalledTimes(2)
    })
    
    test('does not call convert if hiragana character not enabled', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('converts hiragana character ん to n if extension gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).not.toContain('n')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})
        expect(document.body.textContent).toContain('n')
    })

    test('converts hiragana character あ to a if extension gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain('a')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        expect(document.body.textContent).toContain('a')
    })
    
    test('converts hiragana character ん to n if checkbox gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).not.toContain('n')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: false})
        expect(document.body.textContent).toContain('n')
        
    })
    
    test('converts hiragana character あ to a checkbox it gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).toContain('あ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain('あ')
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
