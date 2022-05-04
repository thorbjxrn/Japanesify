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
        const page = await browser.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup.html`)

        const h2 = await page.$eval('h2', el => el.textContent)
        expect(h2).toBe('Japanesify')

        // Then he sees an enable button and decides to click it.
        let enableToggleText = await page.$eval('[test-id="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('enable')
        await page.click('[test-id="enable-button"]')

        // After clicking the button he notices the text changes to disable
        enableToggleText = await page.$eval('[test-id="enable-button"]', el => el.textContent)
        expect(enableToggleText).toBe('disable')

        // He opens a new page but since none of the conversions are selected nothing happens.
        fail('Finish the test!')

        // He then decides to enable 'ん' character. 
        // He goes back to the tab and notices that all the 'n's are replaced by 'ん's

        // He opens a new tab and notices that all the 'n's are also replaced by 'ん's

        // He goes back to the extension and enables the 'あ' character

        // ... continue with the rest of the characters

    })
})