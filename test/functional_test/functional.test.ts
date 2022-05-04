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
    })

    afterEach(async () => {
        await browser.close()
    })
    
    test('can convert roman alphabet to hiragana and back', async () => {
        // Robert is learning japanese. He stumbles across an extension called Japanesify
        // and decides to install it.


        // He opens the extension popup and sees the title 'Japanesify' after that
        // he decides to enable it.
        const page = await browser.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup.html`)

        const title = await page.title()
        expect(title).toBe('Japanesify')

        // He opens a new page but since none of the conversions are selected nothing happens.

        // He then decides to enable 'ん' character. 
        // He goes back to the tab and notices that all the 'n's are replaced by 'ん's

        // He opens a new tab and notices that all the 'n's are also replaced by 'ん's

        // He goes back to the extension and enables the 'あ' character

        // ... continue with the rest of the characters

    })
})