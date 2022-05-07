
export const convertText = (text: string | null, selection: {n:boolean}): string => {
    const nRegex = new RegExp('n', 'gi')

    return text && selection.n ? text.replace(nRegex, 'ん') : text || ''
}

console.log(document.body)

document.body.innerText = convertText(document.body.innerText, {n:false})
