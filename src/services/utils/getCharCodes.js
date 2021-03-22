const getCharCodes = (word) => {
    var charCodes = word.split("").map(letter => letter.charCodeAt(0));
    return charCodes;
}

export default getCharCodes