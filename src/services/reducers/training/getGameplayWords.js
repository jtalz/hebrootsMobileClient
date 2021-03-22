import { shuffleArray } from "../../utils";

const getGameplayWords = (verbFamily) => {
    const gameplayWords = shuffleArray(verbFamily[0].data.map((verb, i) => {
      return {...getGameplayWordFormat(verb), tense: verbFamily[0].tense.he};
    }))
    return gameplayWords
};

const getGameplayWordFormat = (verb) => {
    return {
        possessionInfo: {
            possession_en: verb.possession.en_pronoun,
            possession: verb.possession.possession,
            morphology: verb.possession.morphology,
          },
          conjugation: verb.conjugation
    }
}

export default getGameplayWords;
