
export const convertText = (text: string | null): string => {
    const nRegex = new RegExp('n', 'gi')


    return text ? text.replace(nRegex, 'ん') : ''
}

console.log(document.body)

document.body.innerText = convertText(document.body.innerText)
