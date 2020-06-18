// State saving methods
const getIsEnabled = () => {
    return JSON.parse(localStorage.getItem('japanesifyIsEnabled')) ? true : false;
}

const saveIsEnabled = (isEnabled) => {
    localStorage.japanesifyIsEnabled = JSON.stringify(isEnabled);
}

const getCharacteSelections = () => {
    const chars = JSON.parse(localStorage.getItem('japanesifyCharacteSelections')) 
        || {n: false, a: false, i: true, u: false, o: false, e: false, 
        da: false, ha: false, yo: false}; //default value if not saved to storage. The order is : n, a, i, u, o, e

    return chars;
}

const saveCharacteSelections = (chars) => {
    localStorage.japanesifyCharacteSelections = JSON.stringify(chars); 
}
