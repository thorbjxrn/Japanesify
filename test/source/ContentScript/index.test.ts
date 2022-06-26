import { browser } from 'webextension-polyfill-ts'
import path from 'path'
import * as fs from 'fs';
import * as ContentScript from '../../../source/ContentScript/index'
import { defaultJapanesifyState } from '../../../source/utils/constants';

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
        convertText(text, {...defaultJapanesifyState, enabled: true, n: true})

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
    
    // TODO: are these tests useful?
    test.each`
      hiragana | letter
      ${'ん'}  | ${'n'}  
      ${'あ'}  | ${'a'}  
      ${'い'}  | ${'i'}  
    `('calls convertText if enabled and $hiragana is clicked', ({letter}) => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [letter]: true})
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [letter]: false})

        expect(convertSpy).toBeCalledTimes(2)
    })
    
    test('does not call convert if hiragana character none are selected', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false})

        expect(convertSpy).not.toBeCalled()
    })
    
    test.each`
    syllable | hiragana
    ${'n'}   | ${'ん'} 
    `('converts "$syllable" to "$hiragana" and back if enable button gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).toContain(hiragana)
        expect(document.body.textContent).not.toContain(syllable)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})
        expect(document.body.textContent).not.toContain(hiragana)
        expect(document.body.textContent).toContain(syllable)
    })

    test.each`
    syllable | hiragana
    ${'wa'}  | ${'わ'}
    ${'ra'}  | ${'ら'}
    ${'ya'}  | ${'や'}
    ${'ma'}  | ${'ま'}
    ${'ha'}  | ${'は'}
    ${'na'}  | ${'な'}
    ${'ta'}  | ${'た'}
    ${'sa'}  | ${'さ'}
    ${'ka'}  | ${'か'}
    ${'a'}   | ${'あ'}
    `('converts "$syllable" to "$hiragana" and back if enable button gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        
        expect(document.body.textContent).toContain(hiragana)
        expect(document.body.textContent).not.toContain(syllable)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        
        expect(document.body.textContent).toContain(syllable)
        expect(document.body.textContent).not.toContain(hiragana)
    })
    
    test.each`
    syllable | hiragana
    ${'ri'}  | ${'り'}
    ${'mi'}  | ${'み'}
    ${'ni'}  | ${'に'}
    ${'shi'} | ${'し'}
    ${'chi'} | ${'ち'}
    ${'hi'}  | ${'ひ'}
    ${'ki'}  | ${'き'}
    ${'i'}   | ${'い'}
    `('converts "$syllable" to "$hiragana" and back if enable button gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, i: true})
        
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        
        expect(document.body.textContent).toContain(syllable)
        expect(document.body.textContent).not.toContain(hiragana)
    })
    
    test.each`
    syllable | hiragana
    ${'tsu'} | ${'つ'}
    ${'su'}  | ${'す'}
    ${'nu'}  | ${'ぬ'}
    ${'fu'}  | ${'ふ'}
    ${'mu'}  | ${'む'}
    ${'ru'}  | ${'る'}
    ${'yu'}  | ${'ゆ'}
    ${'ku'}  | ${'く'}
    ${'u'}   | ${'う'}
    `('converts "$syllable" to "$hiragana" and back if enable button gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, u: true})
        expect(document.body.textContent).toContain(syllable)
        expect(document.body.textContent).not.toContain(hiragana)
    })
    
    test.each`
    syllable | hiragana
    ${'re'}  | ${'れ'}
    ${'me'}  | ${'め'}
    ${'he'}  | ${'へ'}
    ${'ne'}  | ${'ね'}
    ${'te'}  | ${'て'}
    ${'se'}  | ${'せ'}
    ${'ke'}  | ${'け'}
    ${'e'}   | ${'え'}
    `('converts "$syllable" to "$hiragana" and back if enable button gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, e: true})
        expect(document.body.textContent).toContain(syllable)
        expect(document.body.textContent).not.toContain(hiragana)
    })
    
    test.each`
    syllable | hiragana
    ${'n'}   | ${'ん'} 
    `('converts hiragana character ん to n if checkbox gets disabled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: false})
        expect(document.body.textContent).toContain(syllable)
        expect(document.body.textContent).not.toContain(hiragana)
    })
    
    test.each`
    syllable | hiragana
    ${'wa'}  | ${'わ'}
    ${'ra'}  | ${'ら'}
    ${'ya'}  | ${'や'}
    ${'ma'}  | ${'ま'}
    ${'ha'}  | ${'は'}
    ${'na'}  | ${'な'}
    ${'ta'}  | ${'た'}
    ${'sa'}  | ${'さ'}
    ${'ka'}  | ${'か'}
    ${'a'}   | ${'あ'}
    `('converts "$syllable" to "$hiragana" and back if a checkbox gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain(hiragana)
        expect(document.body.textContent).toContain(syllable)
    })
    
    test.each`
    syllable | hiragana
    ${'ri'}  | ${'り'}
    ${'mi'}  | ${'み'}
    ${'ni'}  | ${'に'}
    ${'shi'} | ${'し'}
    ${'chi'} | ${'ち'}
    ${'hi'}  | ${'ひ'}
    ${'ki'}  | ${'き'}
    ${'i'}   | ${'い'}
    `('converts "$syllable" to "$hiragana" and back if a checkbox gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, i: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain(hiragana)
        expect(document.body.textContent).toContain(syllable)
    })
    
    test.each`
    syllable | hiragana
    ${'tsu'} | ${'つ'}
    ${'su'}  | ${'す'}
    ${'nu'}  | ${'ぬ'}
    ${'fu'}  | ${'ふ'}
    ${'mu'}  | ${'む'}
    ${'ru'}  | ${'る'}
    ${'yu'}  | ${'ゆ'}
    ${'ku'}  | ${'く'}
    ${'u'}   | ${'う'}
    `('converts "$syllable" to "$hiragana" and back if a checkbox gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: false})
        expect(document.body.textContent).not.toContain(hiragana)
        expect(document.body.textContent).toContain(syllable)
    })
    
    test.each`
    syllable | hiragana
    ${'re'}  | ${'れ'}
    ${'me'}  | ${'め'}
    ${'he'}  | ${'へ'}
    ${'ne'}  | ${'ね'}
    ${'te'}  | ${'て'}
    ${'se'}  | ${'せ'}
    ${'ke'}  | ${'け'}
    ${'e'}   | ${'え'}
    `('converts "$syllable" to "$hiragana" and back if a checkbox gets toggled', ({syllable, hiragana}) => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: true})
        expect(document.body.textContent).not.toContain(syllable)
        expect(document.body.textContent).toContain(hiragana)
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: false})
        expect(document.body.textContent).not.toContain(hiragana)
        expect(document.body.textContent).toContain(syllable)
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
