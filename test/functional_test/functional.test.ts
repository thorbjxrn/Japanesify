import puppeteer, { Browser } from 'puppeteer' 
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
        let body = await wikiPage.$eval('body', el => el.textContent)
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
        body = await wikiPage.$eval('body', el => el.textContent)
        expect(body).not.toContain('n')
        expect(body).toContain('ん')
        
        fail('Finish the test!')

        // He opens a new tab and notices that all the 'n's are also replaced by 'ん's

        // He goes back to the extension and enables the 'あ' character

        // ... continue with the rest of the characters

    }, 10000)
})