const getHebrewConsonantCodes = (verb) => {
    var charCodes = verb.split("").map(letter => letter.charCodeAt(0));
    var consonantCodes = charCodes.filter(sign => sign >= 1488 && sign <= 1514);
    return consonantCodes;
}
export default getHebrewConsonantCodes;