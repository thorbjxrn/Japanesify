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
    
    test('converts ん character to hiragana and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).toContain('ん')
        expect(document.body.textContent).not.toContain('n')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})
        expect(document.body.textContent).not.toContain('ん')
        expect(document.body.textContent).toContain('n')
    })

    test('converts あ syllables to hiragana characters and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain('a')
        expect(document.body.textContent).not.toContain('kあ')
        expect(document.body.textContent).not.toContain('sあ')
        expect(document.body.textContent).not.toContain('tあ')
        expect(document.body.textContent).not.toContain('nあ')
        expect(document.body.textContent).not.toContain('hあ')
        expect(document.body.textContent).not.toContain('mあ')
        expect(document.body.textContent).not.toContain('yあ')
        expect(document.body.textContent).not.toContain('rあ')
        expect(document.body.textContent).not.toContain('wあ')
        expect(document.body.textContent).toContain('あ')
        expect(document.body.textContent).toContain('か')
        expect(document.body.textContent).toContain('さ')
        expect(document.body.textContent).toContain('た')
        expect(document.body.textContent).toContain('な')
        expect(document.body.textContent).toContain('は')
        expect(document.body.textContent).toContain('ま')
        expect(document.body.textContent).toContain('や')
        expect(document.body.textContent).toContain('ら')
        expect(document.body.textContent).toContain('わ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        expect(document.body.textContent).toContain('a')
        expect(document.body.textContent).toContain('ka')
        expect(document.body.textContent).toContain('sa')
        expect(document.body.textContent).toContain('ta')
        expect(document.body.textContent).toContain('na')
        expect(document.body.textContent).toContain('ha')
        expect(document.body.textContent).toContain('ma')
        expect(document.body.textContent).toContain('ya')
        expect(document.body.textContent).toContain('ra')
        expect(document.body.textContent).toContain('wa')
        expect(document.body.textContent).not.toContain('あ')
        expect(document.body.textContent).not.toContain('か')
        expect(document.body.textContent).not.toContain('さ')
        expect(document.body.textContent).not.toContain('た')
        expect(document.body.textContent).not.toContain('な')
        expect(document.body.textContent).not.toContain('は')
        expect(document.body.textContent).not.toContain('ま')
        expect(document.body.textContent).not.toContain('や')
        expect(document.body.textContent).not.toContain('ら')
        expect(document.body.textContent).not.toContain('わ')
    })
    
    test('converts い syllables to hiragana characters and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, i: true})
        expect(document.body.textContent).not.toContain('i')
        expect(document.body.textContent).not.toContain('kい')
        expect(document.body.textContent).not.toContain('shい')
        expect(document.body.textContent).not.toContain('chい')
        expect(document.body.textContent).not.toContain('nい')
        expect(document.body.textContent).not.toContain('hい')
        expect(document.body.textContent).not.toContain('mい')
        expect(document.body.textContent).not.toContain('rい')
        expect(document.body.textContent).toContain('い')
        expect(document.body.textContent).toContain('き')
        expect(document.body.textContent).toContain('し')
        expect(document.body.textContent).toContain('ち')
        expect(document.body.textContent).toContain('に')
        expect(document.body.textContent).toContain('ひ')
        expect(document.body.textContent).toContain('み')
        expect(document.body.textContent).toContain('り')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, a: true})
        expect(document.body.textContent).toContain('i')
        expect(document.body.textContent).toContain('ki')
        expect(document.body.textContent).toContain('shi')
        expect(document.body.textContent).toContain('chi')
        expect(document.body.textContent).toContain('ni')
        expect(document.body.textContent).toContain('hi')
        expect(document.body.textContent).toContain('mi')
        expect(document.body.textContent).toContain('ri')
        expect(document.body.textContent).not.toContain('い')
        expect(document.body.textContent).not.toContain('き')
        expect(document.body.textContent).not.toContain('し')
        expect(document.body.textContent).not.toContain('ち')
        expect(document.body.textContent).not.toContain('に')
        expect(document.body.textContent).not.toContain('ひ')
        expect(document.body.textContent).not.toContain('み')
        expect(document.body.textContent).not.toContain('り')
    })
    
    test('converts う syllables to hiragana characters and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: true})
        expect(document.body.textContent).not.toContain('u')
        expect(document.body.textContent).not.toContain('kう')
        expect(document.body.textContent).not.toContain('yう')
        expect(document.body.textContent).not.toContain('rう')
        expect(document.body.textContent).not.toContain('mう')
        expect(document.body.textContent).not.toContain('fう')
        expect(document.body.textContent).not.toContain('nう')
        expect(document.body.textContent).not.toContain('tsう')
        expect(document.body.textContent).not.toContain('sう')
        expect(document.body.textContent).toContain('う')
        expect(document.body.textContent).toContain('く')
        expect(document.body.textContent).toContain('ゆ')
        expect(document.body.textContent).toContain('る')
        expect(document.body.textContent).toContain('む')
        expect(document.body.textContent).toContain('ふ')
        expect(document.body.textContent).toContain('ぬ')
        expect(document.body.textContent).toContain('つ')
        expect(document.body.textContent).toContain('す')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, u: true})
        expect(document.body.textContent).toContain('u')
        expect(document.body.textContent).toContain('ku')
        expect(document.body.textContent).toContain('yu')
        expect(document.body.textContent).toContain('ru')
        expect(document.body.textContent).toContain('mu')
        expect(document.body.textContent).toContain('fu')
        expect(document.body.textContent).toContain('nu')
        expect(document.body.textContent).toContain('tsu')
        expect(document.body.textContent).toContain('su')
        expect(document.body.textContent).not.toContain('う')
        expect(document.body.textContent).not.toContain('く')
        expect(document.body.textContent).not.toContain('ゆ')
        expect(document.body.textContent).not.toContain('る')
        expect(document.body.textContent).not.toContain('む')
        expect(document.body.textContent).not.toContain('ふ')
        expect(document.body.textContent).not.toContain('ぬ')
        expect(document.body.textContent).not.toContain('つ')
        expect(document.body.textContent).not.toContain('す')
    })
    
    test('converts え syllables to hiragana characters and back if enable button gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: true})
        expect(document.body.textContent).not.toContain('e')
        expect(document.body.textContent).not.toContain('kえ')
        expect(document.body.textContent).not.toContain('sえ')
        expect(document.body.textContent).not.toContain('tえ')
        expect(document.body.textContent).not.toContain('nえ')
        expect(document.body.textContent).not.toContain('hえ')
        expect(document.body.textContent).not.toContain('mえ')
        expect(document.body.textContent).not.toContain('rえ')
        expect(document.body.textContent).toContain('え')
        expect(document.body.textContent).toContain('け')
        expect(document.body.textContent).toContain('せ')
        expect(document.body.textContent).toContain('て')
        expect(document.body.textContent).toContain('ね')
        expect(document.body.textContent).toContain('へ')
        expect(document.body.textContent).toContain('め')
        expect(document.body.textContent).toContain('れ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, e: true})
        expect(document.body.textContent).toContain('e')
        expect(document.body.textContent).toContain('ke')
        expect(document.body.textContent).toContain('se')
        expect(document.body.textContent).toContain('te')
        expect(document.body.textContent).toContain('ne')
        expect(document.body.textContent).toContain('he')
        expect(document.body.textContent).toContain('me')
        expect(document.body.textContent).toContain('re')
        expect(document.body.textContent).not.toContain('え')
        expect(document.body.textContent).not.toContain('け')
        expect(document.body.textContent).not.toContain('せ')
        expect(document.body.textContent).not.toContain('て')
        expect(document.body.textContent).not.toContain('ね')
        expect(document.body.textContent).not.toContain('へ')
        expect(document.body.textContent).not.toContain('め')
        expect(document.body.textContent).not.toContain('れ')
    })
    
    test('converts hiragana character ん to n if checkbox gets disabled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        expect(document.body.textContent).not.toContain('n')
        expect(document.body.textContent).toContain('ん')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: false})
        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('converts あ syllables to hiragana characters and back if a checkbox gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: true})
        expect(document.body.textContent).not.toContain('a')
        expect(document.body.textContent).not.toContain('kあ')
        expect(document.body.textContent).not.toContain('sあ')
        expect(document.body.textContent).not.toContain('tあ')
        expect(document.body.textContent).not.toContain('nあ')
        expect(document.body.textContent).not.toContain('hあ')
        expect(document.body.textContent).not.toContain('mあ')
        expect(document.body.textContent).not.toContain('yあ')
        expect(document.body.textContent).not.toContain('rあ')
        expect(document.body.textContent).not.toContain('wあ')
        expect(document.body.textContent).toContain('あ')
        expect(document.body.textContent).toContain('か')
        expect(document.body.textContent).toContain('さ')
        expect(document.body.textContent).toContain('た')
        expect(document.body.textContent).toContain('な')
        expect(document.body.textContent).toContain('は')
        expect(document.body.textContent).toContain('ま')
        expect(document.body.textContent).toContain('や')
        expect(document.body.textContent).toContain('ら')
        expect(document.body.textContent).toContain('わ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain('あ')
        expect(document.body.textContent).not.toContain('か')
        expect(document.body.textContent).not.toContain('さ')
        expect(document.body.textContent).not.toContain('た')
        expect(document.body.textContent).not.toContain('な')
        expect(document.body.textContent).not.toContain('は')
        expect(document.body.textContent).not.toContain('ま')
        expect(document.body.textContent).not.toContain('や')
        expect(document.body.textContent).not.toContain('ら')
        expect(document.body.textContent).not.toContain('わ')
        expect(document.body.textContent).toContain('a')
        expect(document.body.textContent).toContain('ka')
        expect(document.body.textContent).toContain('sa')
        expect(document.body.textContent).toContain('ta')
        expect(document.body.textContent).toContain('na')
        expect(document.body.textContent).toContain('ha')
        expect(document.body.textContent).toContain('ma')
        expect(document.body.textContent).toContain('ya')
        expect(document.body.textContent).toContain('ra')
        expect(document.body.textContent).toContain('wa')
    })
    
    test('converts い syllables to hiragana characters and back if a checkbox gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, i: true})
        expect(document.body.textContent).not.toContain('i')
        expect(document.body.textContent).not.toContain('kい')
        expect(document.body.textContent).not.toContain('shい')
        expect(document.body.textContent).not.toContain('chい')
        expect(document.body.textContent).not.toContain('nい')
        expect(document.body.textContent).not.toContain('hい')
        expect(document.body.textContent).not.toContain('mい')
        expect(document.body.textContent).not.toContain('rい')
        expect(document.body.textContent).toContain('い')
        expect(document.body.textContent).toContain('き')
        expect(document.body.textContent).toContain('し')
        expect(document.body.textContent).toContain('ち')
        expect(document.body.textContent).toContain('に')
        expect(document.body.textContent).toContain('ひ')
        expect(document.body.textContent).toContain('み')
        expect(document.body.textContent).toContain('り')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, a: false})
        expect(document.body.textContent).not.toContain('い')
        expect(document.body.textContent).not.toContain('き')
        expect(document.body.textContent).not.toContain('し')
        expect(document.body.textContent).not.toContain('ち')
        expect(document.body.textContent).not.toContain('に')
        expect(document.body.textContent).not.toContain('ひ')
        expect(document.body.textContent).not.toContain('み')
        expect(document.body.textContent).not.toContain('り')
        expect(document.body.textContent).toContain('i')
        expect(document.body.textContent).toContain('ki')
        expect(document.body.textContent).toContain('shi')
        expect(document.body.textContent).toContain('chi')
        expect(document.body.textContent).toContain('ni')
        expect(document.body.textContent).toContain('hi')
        expect(document.body.textContent).toContain('mi')
        expect(document.body.textContent).toContain('ri')
    })
    
    test('converts う syllables to hiragana characters and back if a checkbox gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: true})
        expect(document.body.textContent).not.toContain('u')
        expect(document.body.textContent).not.toContain('kう')
        expect(document.body.textContent).not.toContain('yう')
        expect(document.body.textContent).not.toContain('rう')
        expect(document.body.textContent).not.toContain('mう')
        expect(document.body.textContent).not.toContain('fう')
        expect(document.body.textContent).not.toContain('nう')
        expect(document.body.textContent).not.toContain('tsう')
        expect(document.body.textContent).not.toContain('sう')
        expect(document.body.textContent).toContain('う')
        expect(document.body.textContent).toContain('く')
        expect(document.body.textContent).toContain('ゆ')
        expect(document.body.textContent).toContain('る')
        expect(document.body.textContent).toContain('む')
        expect(document.body.textContent).toContain('ふ')
        expect(document.body.textContent).toContain('ぬ')
        expect(document.body.textContent).toContain('つ')
        expect(document.body.textContent).toContain('す')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, u: false})
        expect(document.body.textContent).not.toContain('う')
        expect(document.body.textContent).not.toContain('く')
        expect(document.body.textContent).not.toContain('ゆ')
        expect(document.body.textContent).not.toContain('る')
        expect(document.body.textContent).not.toContain('む')
        expect(document.body.textContent).not.toContain('ふ')
        expect(document.body.textContent).not.toContain('ぬ')
        expect(document.body.textContent).not.toContain('つ')
        expect(document.body.textContent).not.toContain('す')
        expect(document.body.textContent).toContain('u')
        expect(document.body.textContent).toContain('ku')
        expect(document.body.textContent).toContain('yu')
        expect(document.body.textContent).toContain('ru')
        expect(document.body.textContent).toContain('mu')
        expect(document.body.textContent).toContain('fu')
        expect(document.body.textContent).toContain('nu')
        expect(document.body.textContent).toContain('tsu')
        expect(document.body.textContent).toContain('su')
    })
    
    test('converts え syllables to hiragana characters and back if a checkbox gets toggled', () => {
        document.body.innerHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'fixtures', 'basic.html'), 'utf8')

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: true})
        expect(document.body.textContent).not.toContain('e')
        expect(document.body.textContent).not.toContain('kえ')
        expect(document.body.textContent).not.toContain('sえ')
        expect(document.body.textContent).not.toContain('tえ')
        expect(document.body.textContent).not.toContain('nえ')
        expect(document.body.textContent).not.toContain('hえ')
        expect(document.body.textContent).not.toContain('mえ')
        expect(document.body.textContent).not.toContain('rえ')
        expect(document.body.textContent).toContain('え')
        expect(document.body.textContent).toContain('け')
        expect(document.body.textContent).toContain('せ')
        expect(document.body.textContent).toContain('て')
        expect(document.body.textContent).toContain('ね')
        expect(document.body.textContent).toContain('へ')
        expect(document.body.textContent).toContain('め')
        expect(document.body.textContent).toContain('れ')
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, e: false})
        expect(document.body.textContent).not.toContain('え')
        expect(document.body.textContent).not.toContain('け')
        expect(document.body.textContent).not.toContain('せ')
        expect(document.body.textContent).not.toContain('て')
        expect(document.body.textContent).not.toContain('ね')
        expect(document.body.textContent).not.toContain('へ')
        expect(document.body.textContent).not.toContain('め')
        expect(document.body.textContent).not.toContain('れ')
        expect(document.body.textContent).toContain('e')
        expect(document.body.textContent).toContain('ke')
        expect(document.body.textContent).toContain('se')
        expect(document.body.textContent).toContain('te')
        expect(document.body.textContent).toContain('ne')
        expect(document.body.textContent).toContain('he')
        expect(document.body.textContent).toContain('me')
        expect(document.body.textContent).toContain('re')
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
