import { browser } from 'webextension-polyfill-ts'
import path from 'path'
import * as fs from 'fs';
import * as ContentScript from '../../../source/ContentScript/index'

describe('Content Script', () => {
    const convertText = ContentScript.convertText
    const convertSpy = jest.spyOn(ContentScript, 'convertText')

    beforeEach(() => {
        convertSpy.mockClear()
    })

    test('converts n to ん', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"
        convertText(newDiv, {enabled:true, n: true})

        expect(newDiv.textContent).not.toContain('n')
        expect(newDiv.textContent).toContain('ん')
    })
    
    test('converts ん to n', () => {
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to coんvert to Japanese"
        convertText(newDiv, {enabled:true, n: false})

        expect(newDiv.textContent).not.toContain('ん')
        expect(newDiv.textContent).toContain('n')
    })

    test('does not converts n to ん', () => {
        const newDiv = document.createElement("div");
        newDiv.innerText = "Sample text to convert to Japanese"
        convertText(newDiv, {enabled: true, n: false})

        expect(newDiv.innerText).toContain('n')
        expect(newDiv.innerText).not.toContain('ん')
    })
    
    test('does not converts n to ん', () => {
        const text = document.createTextNode("div");
        text.textContent = null
        convertText(text, {enabled: true, n: false})

        expect(text.textContent).toBe('')
    })

    test('adds message listener', async () => {
        expect(browser.runtime.onMessage.addListener).toBeCalled()
    })

    test('converts roman character n to hiragana ん when enabled', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        await browser.runtime.sendMessage({enabled: true, n: true})
        
        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
    })

    test('does Not converts roman character n to hiragana ん if not enabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        browser.runtime.sendMessage({enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('does Not call convertText if no checkBox is selected', async () => {        
        browser.runtime.sendMessage({enabled: true, n: false})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('converts hiragana character ん to n if it gets disabled enabled', async () => {
        await browser.runtime.sendMessage({enabled: true, n: false})        
        await browser.runtime.sendMessage({enabled: false, n: false})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('converts hiragana character ん to n if it gets disabled', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        await browser.runtime.sendMessage({enabled: true, n: true})
        
        await browser.runtime.sendMessage({enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('converts hiragana character ん to n if it gets disabled enabled', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        await browser.runtime.sendMessage({enabled: true, n: true})
        
        await browser.runtime.sendMessage({enabled: false, n: false})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })

    test('Should not convert script tag contents', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'excludedElements.html'), 'utf8')
        await browser.runtime.sendMessage({enabled: true, n: true})

        expect(document.body.textContent).toContain('[].push(\'text with an n\');')
    })

    test('Should not convert style tag contents', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'excludedElements.html'), 'utf8')
        await browser.runtime.sendMessage({enabled: true, n: true})

        expect(document.body.textContent).toContain('.mw-editfont-monospace{font-family:monospace,monospace}')
    })
})
