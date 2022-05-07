import {convertText} from '../../../source/ContentScript'
describe('Content Script', () => {
    test('converts n to ん', () => {
        const result = convertText("Sample text to convert to Japanese")

        expect(result).not.toContain('n')
        expect(result).toContain('ん')
    })
})
