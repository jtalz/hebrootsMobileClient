export const checkInflectionRule = (char_code, position, conjugation_Char_Codes) => (fn) => {
    return fn(char_code, position, conjugation_Char_Codes);
};

export const isVowel = (signCode) => signCode < 1488 || signCode > 1514

export const isConsonant = (signCode) => signCode >= 1488 && signCode <= 1514;

const isSpecificLetter = (letterCode) => (enteredLetterCode) => enteredLetterCode == letterCode;

export const isLetterConsonant = (letter) => isConsonant(letter.charCodeAt(0));

const isNthConsonant = (nth) => (signCode, position, conjugationCodes) => {
    //1 for first, -1 for last
    if(!isConsonant(signCode)){
        return false;
    }
    let nTotal = conjugationCodes.filter(sign => sign >= 1488 && sign <= 1514).length
    let count = nTotal, isMyConsonant = false;
    conjugationCodes.forEach((c, i) => {
        if (isConsonant(c)){
            count--;
        }
        if (c==signCode && i == position && (nth + count == nTotal || nth + count == -1 )){
            isMyConsonant = true;
        }
    })
    return isMyConsonant;
}

const isYud = isSpecificLetter(1497)

const isVuv = isSpecificLetter(1493)

const isLamed = isSpecificLetter(1500)

const isSpecificLetterAndNthConsonant = (isLetterFn, isNthConsonantFn) => (signCode, position, conjugationCodes) => {
    if (isLetterFn(signCode) && isNthConsonantFn(signCode, position, conjugationCodes))
        return true
    else
        return false
}

const isFirstInstanceOf = (letter) => (attempt, position, base_form) => {
    if (letter !== attempt){
        return false
    }else{
        return base_form.indexOf(attempt) == position ? true : false;
    }
}

export const isFirstHey = isFirstInstanceOf('ה'.charCodeAt(0));
export const isFirstTuff = isFirstInstanceOf('ת'.charCodeAt(0))
const isFirstTuffCode = isFirstInstanceOf('ת'.charCodeAt(0))

export const isSecondToLastConsonant = isNthConsonant(-2)

export const isThirdToLastConsonant = isNthConsonant(-3)

export const isFourthToLastConsonant = isNthConsonant(-4)

export const isLastConsonant = isNthConsonant(-1)

export const isFirstConsonant = isNthConsonant(1)

export const isSecondConsonant = isNthConsonant(2)

export const isThirdConsonant = isNthConsonant(3)

export const isYudAndSecondConsonant = isSpecificLetterAndNthConsonant(isYud, isSecondConsonant)

export const isVuvAndSecondToLastConsonant = isSpecificLetterAndNthConsonant(isVuv, isSecondToLastConsonant)

export const isYudAndSecondToLastConsonant = isSpecificLetterAndNthConsonant(isYud, isSecondToLastConsonant)

export const isYudAndThirdToLastConsonant = isSpecificLetterAndNthConsonant(isYud, isThirdToLastConsonant)

export const isYudAndFourthToLastConsonant = isSpecificLetterAndNthConsonant(isYud, isFourthToLastConsonant)

export const isVuvAndSecondConsonant = isSpecificLetterAndNthConsonant(isVuv, isSecondConsonant)

export const isLamedAndFirstConsonant = isSpecificLetterAndNthConsonant(isLamed, isFirstConsonant)

export const isFirstTuffDeep = (attempt, position, base_formCharCodes) => {
    const consCodes = base_formCharCodes.filter(c=>isConsonant(c));
    if (
      consCodes.indexOf("ת".charCodeAt(0)) == 1 ||
      consCodes.indexOf("ת".charCodeAt(0)) == 2
    ) {
      return isFirstTuffCode(attempt, position, base_formCharCodes);
    } else {
      return isThirdConsonant(
        attempt,
        position,
        base_formCharCodes
      );
    }
  };