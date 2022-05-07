import {convertText} from '../../../source/ContentScript'
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
})
