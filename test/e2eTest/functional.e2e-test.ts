/*
* @jest-environment node
*/
import puppeteer, { Browser } from 'puppeteer' 
import looksSame from 'looks-same'
import path from 'path'

describe('Japanesify', () => {
    
    let browser: Browser
    const pathToExtension = path.join(__dirname, '..', '..', 'extension', 'chrome');
    const extensionId = 'fnbammfgoclcfilbllfdbnggijpbnnea'

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            args: [
              `--disable-extensions-except=${pathToExtension}`,
              `--load-extension=${pathToExtension}`,
            ],
        });
    }, 10000)

    afterEach(async () => {
        await browser.close()
    })
    
    test('can convert roman alphabet to hiragana and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Happy_Hacking_Keyboard')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        expect(body).not.toContain('ん')
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'ん' character. 
        await extension.bringToFront()
        let んswitchStatus = await extension.$eval('[data-testid="ん-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(んswitchStatus).toBe(false)

        await extension.click('[data-testid="ん-switch"]')
        んswitchStatus = await extension.$eval('[data-testid="ん-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(んswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the 'n's are replaced by 'ん's
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        expect(body).not.toContain('n')
        expect(body).toContain('ん')

        // He opens a new tab and notices that all the 'n's are also replaced by 'ん's
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Empress_Xiaocigao_(Qing_dynasty)')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        expect(body).not.toContain('n')
        expect(body).toContain('ん')

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'ん' character 
        await extension.click('[data-testid="ん-switch"]')
        んswitchStatus = await extension.$eval('[data-testid="ん-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(んswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 'n's are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        expect(body).not.toContain('ん')
        expect(body).toContain('n')

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 50}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 10000)

    test('can convert roman alphabet: a, ka, sa, ta, na, ha, ma, ya, ra, wa to hiragana: あ, か, さ, た, な, は, ま, や, ら, わ and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        const hiraA = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']
        const romaA = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa']

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Papuan_mountain_pigeon')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        hiraA.forEach((hira) => expect(body).not.toContain(hira))
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'あ' character. 
        await extension.bringToFront()
        let あswitchStatus = await extension.$eval('[data-testid="あ-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(あswitchStatus).toBe(false)

        await extension.click('[data-testid="あ-switch"]')
        あswitchStatus = await extension.$eval('[data-testid="あ-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(あswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the 'a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa' 
        // are replaced by 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaA.forEach((roma) => expect(body).not.toContain(roma))
        hiraA.forEach((hira) => expect(body).toContain(hira))

        // He opens a new tab and notices that all the 'a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'
        // are also replaced by 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Empress_Xiaocigao_(Qing_dynasty)')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        romaA.forEach((roma) => expect(body).not.toContain(roma))
        hiraA.forEach((hira) => expect(body).toContain(hira))

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'あ' character 
        await extension.click('[data-testid="あ-switch"]')
        あswitchStatus = await extension.$eval('[data-testid="あ-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(あswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 
        // 'a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa' are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaA.forEach((roma) => expect(body).toContain(roma))
        hiraA.forEach((hira) => expect(body).not.toContain(hira))

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 82}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 10000)

    test('can convert roman alphabet: i, ki, shi, chi, ni, hi, mi, ri to hiragana: い, き, し, ち, に, ひ, み, り and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        const hiraI = ['い', 'き', 'し', 'ち', 'に', 'ひ', 'み', 'り']
        const romaI = ['i', 'ki', 'shi', 'chi', 'ni', 'hi', 'mi', 'ri']

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Papuan_mountain_pigeon')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        hiraI.forEach((hira) => expect(body).not.toContain(hira))
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'あ' character. 
        await extension.bringToFront()
        let いswitchStatus = await extension.$eval('[data-testid="い-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(いswitchStatus).toBe(false)

        await extension.click('[data-testid="い-switch"]')
        いswitchStatus = await extension.$eval('[data-testid="い-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(いswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the i, ki, shi, chi, ni, hi, mi, ri
        // are replaced by い, き, し, ち, に, ひ, み, り
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaI.forEach((roma) => expect(body).not.toContain(roma))
        hiraI.forEach((hira) => expect(body).toContain(hira))

        // He opens a new tab and notices that all the i, ki, shi, chi, ni, hi, mi, ri
        // are also replaced by い, き, し, ち, に, ひ, み, り
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Empress_Xiaocigao_(Qing_dynasty)')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        romaI.forEach((roma) => expect(body).not.toContain(roma))
        hiraI.forEach((hira) => expect(body).toContain(hira))

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'い' character 
        await extension.click('[data-testid="い-switch"]')
        いswitchStatus = await extension.$eval('[data-testid="い-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(いswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 
        // i, ki, shi, chi, ni, hi, mi, ri are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaI.forEach((roma) => expect(body).toContain(roma))
        hiraI.forEach((hira) => expect(body).not.toContain(hira))

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 82}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 10000)
    
    test('can convert roman alphabet: u, ku, su, tsu, nu, fu, mu, ru, yu to hiragana: う, く, す, つ, ぬ, ふ, む, る, ゆ and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        const hiraU = ['う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'る', 'ゆ']
        const romaU = ['u', 'ku', 'su', 'tsu', 'nu', 'fu', 'mu', 'ru', 'yu']

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Levantine_Arabic')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        hiraU.forEach((hira) => expect(body).not.toContain(hira))
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'う' character. 
        await extension.bringToFront()
        let うswitchStatus = await extension.$eval('[data-testid="う-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(うswitchStatus).toBe(false)

        await extension.click('[data-testid="う-switch"]')
        うswitchStatus = await extension.$eval('[data-testid="う-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(うswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the u, ku, su, tsu, nu, fu, mu, ru, yu
        // are replaced by う, く, す, つ, ぬ, ふ, む, る, ゆ
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaU.forEach((roma) => expect(body).not.toContain(roma))
        hiraU.forEach((hira) => expect(body).toContain(hira))

        // He opens a new tab and notices that all the u, ku, su, tsu, nu, fu, mu, ru, yu
        // are also replaced by う, く, す, つ, ぬ, ふ, む, る, ゆ
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Japan')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        romaU.forEach((roma) => expect(body).not.toContain(roma))
        hiraU.forEach((hira) => expect(body).toContain(hira))

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'う' character 
        await extension.click('[data-testid="う-switch"]')
        うswitchStatus = await extension.$eval('[data-testid="う-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(うswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 
        // i, ki, shi, chi, ni, hi, mi, ri are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaU.forEach((roma) => expect(body).toContain(roma))
        hiraU.forEach((hira) => expect(body).not.toContain(hira))

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 82}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 20000)
    
    test('can convert roman alphabet: e, ke, se, te, ne, he, me, re to hiragana: え, け, せ, て, ね, へ, め, れ and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        const hiraE = ['え', 'け', 'せ', 'て', 'ね', 'へ', 'め', 'れ']
        const romaE = ['e', 'ke', 'se', 'te', 'ne', 'he', 'me', 're']

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Levantine_Arabic')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        hiraE.forEach((hira) => expect(body).not.toContain(hira))
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'う' character. 
        await extension.bringToFront()
        let えswitchStatus = await extension.$eval('[data-testid="え-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(えswitchStatus).toBe(false)

        await extension.click('[data-testid="え-switch"]')
        えswitchStatus = await extension.$eval('[data-testid="え-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(えswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the e, ke, se, te, ne, he, me, re
        // are replaced by え, け, せ, て, ね, へ, め, れ
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaE.forEach((roma) => expect(body).not.toContain(roma))
        hiraE.forEach((hira) => expect(body).toContain(hira))

        // He opens a new tab and notices that all the e, ke, se, te, ne, he, me, re
        // are also replaced by え, け, せ, て, ね, へ, め, れ
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Japan')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        romaE.forEach((roma) => expect(body).not.toContain(roma))
        hiraE.forEach((hira) => expect(body).toContain(hira))

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'え' character 
        await extension.click('[data-testid="え-switch"]')
        えswitchStatus = await extension.$eval('[data-testid="え-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(えswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 
        // e, ke, se, te, ne, he, me, re are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaE.forEach((roma) => expect(body).toContain(roma))
        hiraE.forEach((hira) => expect(body).not.toContain(hira))

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 98}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 20000)
    
    test('can convert roman alphabet: o, ko, so, to, no, ho, mo, ro, yo, wo to hiragana: お, こ, そ, と, の, ほ, も, ろ, よ, を and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.

        const hiraO = ['お', 'こ', 'そ', 'と', 'の',  'ほ', 'も', 'ろ',  'よ', 'を']
        const romaO = ['o', 'ko', 'so', 'to', 'no', 'ho', 'mo', 'ro', 'yo', 'wo']

        // He opens the extension popup and sees the title 'Japanesify'.
        const [extension] = await browser.pages();
        await extension.goto(`chrome-extension://${extensionId}/popup.html`)

        const h3 = await extension.$eval('h3', el => el.textContent)
        expect(h3).toBe('Japanesify!')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[data-testid="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[data-testid="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but nothing happens.
        const wikiPage = await browser.newPage();
        await wikiPage.goto('https://en.wikipedia.org/wiki/Levantine_Arabic')
        const originalImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'original.png')}*/);
        let body = await wikiPage.$eval('body', (el) => (el as HTMLElement).innerText)
        hiraO.forEach((hira) => expect(body).not.toContain(hira))
        
        // He goes back and notices none of the conversions are selected, he then decides to enable 'お' character. 
        await extension.bringToFront()
        let おswitchStatus = await extension.$eval('[data-testid="お-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(おswitchStatus).toBe(false)

        await extension.click('[data-testid="お-switch"]')
        おswitchStatus = await extension.$eval('[data-testid="お-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(おswitchStatus).toBe(true)
        
        // He goes back to the tab and notices that all the o, ko, so, to, no, ho, mo, ro, yo, wo to
        // are replaced by お, こ, そ, と, の, ほ, も, ろ, よ, を
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaO.forEach((roma) => expect(body).not.toContain(roma))
        hiraO.forEach((hira) => expect(body).toContain(hira))

        // He opens a new tab and notices that all the o, ko, so, to, no, ho, mo, ro, yo, wo to
        // are also replaced by お, こ, そ, と, の, ほ, も, ろ, よ, を
        const wikiPage2 = await browser.newPage();
        await wikiPage2.goto('https://en.wikipedia.org/wiki/Japan')
        body = await wikiPage2.$eval('body', el => (el as HTMLElement).innerText)
        romaO.forEach((roma) => expect(body).not.toContain(roma))
        hiraO.forEach((hira) => expect(body).toContain(hira))

        // He closes the second page and goes back to the extension
        await wikiPage2.close()
        await extension.bringToFront()
        
        // He goes back to the extension and disables the 'お' character 
        await extension.click('[data-testid="お-switch"]')
        おswitchStatus = await extension.$eval('[data-testid="お-switch"]', input => {
            return (input as HTMLInputElement).checked
        })
        expect(おswitchStatus).toBe(false)
        
        // then goes back to the first wiki page and sees that the 
        // o, ko, so, to, no, ho, mo, ro, yo, wo to are back
        await wikiPage.bringToFront()
        await wikiPage.waitForTimeout(1000) // TODO: fix this
        body = await wikiPage.$eval('body', el => (el as HTMLElement).innerText)
        romaO.forEach((roma) => expect(body).toContain(roma))
        hiraO.forEach((hira) => expect(body).not.toContain(hira))

        // he also notices the page looks the same as it did before being altered
        const restoredImage = await wikiPage.screenshot(/*{ path: path.join(__dirname, 'restored.png')}*/)
        looksSame(originalImage, restoredImage, {tolerance: 61}, (_, {equal}) => {
            expect(equal).toBe(true)
        })

        await wikiPage.waitForTimeout(3000) // TODO: fix this
        
        // Satisfied he goes to sleep
    }, 20000)
})