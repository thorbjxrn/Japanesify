import { browser } from 'webextension-polyfill-ts'
import path from 'path'
import * as fs from 'fs';
import { convertText } from '../../../source/ContentScript/index'

describe('Content Script', () => {
    test('converts n to ん', () => {
        const result = convertText("Sample text to convert to Japanese", {n: true})

        expect(result).not.toContain('n')
        expect(result).toContain('ん')
    })

    test('does not converts n to ん', () => {
        const result = convertText("Sample text to not convert to Japanese", {n: false})

        expect(result).toContain('n')
        expect(result).not.toContain('ん')
    })

    test('adds message listener', async () => {
        expect(browser.runtime.onMessage.addListener).toBeCalled()
    })

    test('converts roman character n to hiragana ん', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        browser.runtime.sendMessage({enabled: true, n: true})

        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
    })
})
