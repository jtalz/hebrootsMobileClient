import getCharacterCodes from "./GetCharacterCodes";
import getConsonantCodes from "./GetConsonantCodes";
import {
  isSecondToLastConsonant,
  isThirdConsonant,
  isFirstConsonant,
  isFirstHey,
  isFirstTuff,
  isLetterConsonant,
} from "../GetMethods/GetFormattedConjugation";

export const extractTrueRoot = (base_form, pattern) => {
  const base_formCharCodes = getCharacterCodes(base_form);

  const isFirstTuffDeep = (attempt, position) => {
    const consCodes = getConsonantCodes(base_form);
    if (
      consCodes.indexOf("ת".charCodeAt(0)) == 1 ||
      consCodes.indexOf("ת".charCodeAt(0)) == 2
    ) {
      return isFirstTuff(attempt, position, base_form);
    } else {
      return isThirdConsonant(
        attempt.charCodeAt(0),
        position,
        base_formCharCodes
      );
    }
  };

  const trueRoot = base_form.split("").filter((letter, position) => {
    if (pattern == "A" || pattern == "C") {
      return isLetterConsonant(letter);
    } else if (pattern == "B") {
      if(isLetterConsonant(letter, position) && !isFirstConsonant(letter.charCodeAt(0), position, base_formCharCodes))
        return true
      else
        return false
    } else if (pattern == "E") {
      if (
        isLetterConsonant(letter) &&
        !isFirstHey(letter, position, base_form) &&
        !isFirstTuffDeep(letter, position, base_form)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (pattern == "F") {
      if (
        isLetterConsonant(letter) &&
        !isFirstHey(letter, position, base_form) &&
        !isSecondToLastConsonant(
          letter.charCodeAt(0),
          position,
          base_formCharCodes
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  });
  return trueRoot.join(".");
};
