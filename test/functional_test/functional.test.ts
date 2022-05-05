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

        const h2 = await extension.$eval('h2', el => el.textContent)
        expect(h2).toBe('Japanesify')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await extension.$eval('[test-id="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await extension.click('[test-id="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await extension.$eval('[test-id="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but since none of the conversions are selected nothing happens.
        const basicPage = await browser.newPage();
        await basicPage.goto(`file://${path.join(__dirname, '..', 'fixtures', 'basic.html')}`)
        let body = await basicPage.$eval('body', el => el.textContent)
        expect(body).not.toContain('ん')
        
        // He then decides to enable 'ん' character. 
        await extension.bringToFront()
        await extension.click('[test-id="ん-switch"]')
        
        // He goes back to the tab and notices that all the 'n's are replaced by 'ん's
        fail('Finish the test!')

        // He opens a new tab and notices that all the 'n's are also replaced by 'ん's

        // He goes back to the extension and enables the 'あ' character

        // ... continue with the rest of the characters

    })
})