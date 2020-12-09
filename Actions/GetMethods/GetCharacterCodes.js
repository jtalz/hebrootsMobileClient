const getCharacterCodes = (verb) => {
    var charCodes = verb.split("").map(letter => letter.charCodeAt(0));
    return charCodes;
}

export default getCharacterCodes