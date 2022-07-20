import { browser } from 'webextension-polyfill-ts'
import * as ContentScript from '../../../source/ContentScript/index'
import { defaultJapanesifyState } from '../../../source/utils/constants';
import { basic, excludedElements } from '../../fixtures/html';
import { hiraA, hiraE, hiraI, hiraN, hiraO, hiraRomaA, hiraRomaE, hiraRomaI, romaN, hiraRomaO, hiraRomaU, hiraU, romaHanDakYoonA, hiraHanDakYoonA, romaHanDakI, hiraHanDakI, romaHanDakU, hiraHanDakU, romaHanDakE, hiraHanDakE, hiraHanDakO, romaHanDakO } from '../../fixtures/testInputs';

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
        document.body.innerHTML = basic
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})
        
        // Since convertText is called recursively it has 6 executions by the time
        // this expect ie reached.
        expect(convertSpy).toBeCalledTimes(6)
        
        const newDiv = document.createElement("div");
        newDiv.textContent = "Sample text to convert to Japanese"

        // await does seem to do something ¯\_(ツ)_/¯
        await document.body.appendChild(newDiv)
        
        // convertText is executed 2 more times once for the div
        // another for the text node.
        expect(convertSpy).toBeCalledTimes(8)
    })

    test('does Not converts roman character n to hiragana ん if not enabled', () => {
        document.body.innerHTML = basic
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, n: true})

        expect(document.body.textContent).toContain('n')
        expect(document.body.textContent).not.toContain('ん')
    })
    
    test('does Not call convertText if no vowel is selected', () => {        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})

        expect(convertSpy).not.toBeCalled()
    })
    
    test('does not call convert if hiragana character none are selected', () => {
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false})

        expect(convertSpy).not.toBeCalled()
    })

    test.each`
    checkbox | syllables    | hiraganas
    ${"n"}   | ${romaN}     | ${hiraN}
    ${"a"}   | ${hiraRomaA} | ${hiraA}
    ${"i"}   | ${hiraRomaI} | ${hiraI}
    ${"u"}   | ${hiraRomaU} | ${hiraU}
    ${"e"}   | ${hiraRomaE} | ${hiraE}
    ${"o"}   | ${hiraRomaO} | ${hiraO}
    `('converts "$checkbox" syllables to "$hiraganas" and back if enable button gets toggled', ({checkbox, syllables, hiraganas}) => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [checkbox]: true})
        
        hiraganas.forEach((_: string, i: number) => {
            expect(document.body.textContent).toContain(hiraganas[i])
            expect(document.body.textContent).not.toContain(syllables[i])
        })
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: false, [checkbox]: true})
        expect(document.body.textContent).toStrictEqual(original)
    })
    
    test.each`
    checkbox | syllables    | hiraganas
    ${"n"}   | ${romaN}     | ${hiraN}
    ${"a"}   | ${hiraRomaA} | ${hiraA}
    ${"i"}   | ${hiraRomaI} | ${hiraI}
    ${"u"}   | ${hiraRomaU} | ${hiraU}
    ${"e"}   | ${hiraRomaE} | ${hiraE}
    ${"o"}   | ${hiraRomaO} | ${hiraO}
    `('converts "$checkbox" syllables to "$hiraganas" and back if a checkbox gets toggled', ({checkbox, syllables, hiraganas}) => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [checkbox]: true})
        hiraganas.forEach((_: string, i: number) => {
            expect(document.body.textContent).toContain(hiraganas[i])
            expect(document.body.textContent).not.toContain(syllables[i])
        })
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true})
        expect(document.body.textContent).toStrictEqual(original)
    })

    test('Should not convert script tag contents', () => {
        document.body.innerHTML = excludedElements
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})

        expect(document.body.textContent).toContain('[].push(\'text with an n\');')
    })

    test('Should not convert style tag contents', () => {
        document.body.innerHTML = excludedElements
        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true})

        expect(document.body.textContent).toContain('.mw-editfont-monospace{font-family:monospace,monospace}')
    })
    
    test('Should convert n hira ("に", "な", ...) to roma ("ni", "na", ...) when n and $vowel enabled and plugin gets disabled', () => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        const vowels = ["i", "a", "u", "e", "o"]
        const hiras  = ["に", "な", "ぬ", "ね", "の"]
        const hirasComb = ["んい", "んあ", "んう", "んえ", "んお"]

        vowels.forEach((_: string, i: number) => {
            ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, n: true,
                [vowels[i]]: true})
            expect(document.body.textContent).not.toContain(hirasComb[i])
            expect(document.body.textContent).toContain(hiras[i])
    
            ContentScript.togglePluginListener({...defaultJapanesifyState, n: true, [vowels[i]]: true})
            expect(document.body.textContent).toStrictEqual(original)
        })
    })

    test('Should not convert roma to hira if no vowel is checked is checked', () => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, han: true, dak: true, yoon: true })
        expect(document.body.textContent).toStrictEqual(original)
    })

    test.each`
    vowel  | romas          | hiras 
    ${"a"} | ${romaHanDakYoonA} | ${hiraHanDakYoonA}
    ${"i"} | ${romaHanDakI} | ${hiraHanDakI}
    ${"u"} | ${romaHanDakU} | ${hiraHanDakU}
    ${"e"} | ${romaHanDakE} | ${hiraHanDakE}
    ${"o"} | ${romaHanDakO} | ${hiraHanDakO}
    `('Should convert "$romas" to "$hiras" and back if enable button gets toggled', ({vowel, romas, hiras}) => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [vowel]: true, dak: true, han: true, yoon: true })
        romas.forEach((_: string, i: number) => {
            expect(document.body.textContent).not.toContain(romas[i])
            expect(document.body.textContent).toContain(hiras[i])
        })
        
        ContentScript.togglePluginListener({...defaultJapanesifyState, [vowel]:true, dak: true, han: true, yoon: true })
        expect(document.body.textContent).toStrictEqual(original)
    })

    test.each`
    vowel  | romas          | hiras 
    ${"a"} | ${romaHanDakYoonA} | ${hiraHanDakYoonA}
    ${"i"} | ${romaHanDakI} | ${hiraHanDakI}
    ${"u"} | ${romaHanDakU} | ${hiraHanDakU}
    ${"e"} | ${romaHanDakE} | ${hiraHanDakE}
    ${"o"} | ${romaHanDakO} | ${hiraHanDakO}
    `('Should convert "$hiras" to "$romas" if "$vowel" gets disabled', ({vowel, romas, hiras}) => {
        document.body.innerHTML = basic

        const original = document.body.textContent

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, [vowel]:true, dak: true, han: true, yoon: true})
        romas.forEach((_: string, i: number) => {
            expect(document.body.textContent).not.toContain(romas[i])
            expect(document.body.textContent).toContain(hiras[i])
        })

        ContentScript.togglePluginListener({...defaultJapanesifyState, enabled: true, dak: true, han: true, yoon: true })
        expect(document.body.textContent).toStrictEqual(original)
    })
})
