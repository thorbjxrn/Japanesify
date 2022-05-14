import { browser } from 'webextension-polyfill-ts'
import path from 'path'
import * as fs from 'fs';
import { convertText } from '../../../source/ContentScript/index'
import { JapanesifyState } from '../../../source/utils/types';

describe('Content Script', () => {
    test('converts n to ん', () => {
        const result = convertText("Sample text to convert to Japanese", {enabled:true, n: true})

        expect(result).not.toContain('n')
        expect(result).toContain('ん')
    })
    
    test('converts ん to n', () => {
        const result = convertText("Sample text to coんvert to Japanese", {enabled:true, n: false})

        expect(result).not.toContain('ん')
        expect(result).toContain('n')
    })

    test('does not converts n to ん', () => {
        const result = convertText("Sample text to not convert to Japanese", {n: false} as JapanesifyState)

        expect(result).toContain('n')
        expect(result).not.toContain('ん')
    })

    test('adds message listener', async () => {
        expect(browser.runtime.onMessage.addListener).toBeCalled()
    })

    test('converts roman character n to hiragana ん when enabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        browser.runtime.sendMessage({enabled: true, n: true})

        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
    })

    test('does Not converts roman character n to hiragana ん if not enabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        browser.runtime.sendMessage({enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('converts hiragana character ん to n if it gets disabled enabled', async () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        await browser.runtime.sendMessage({enabled: true, n: true})
        
        await browser.runtime.sendMessage({enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
})
