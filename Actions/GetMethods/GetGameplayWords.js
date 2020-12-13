import shuffleArray from "../ShuffleArray";

const getGameplayWords = (verbFamily) => {
    const gameplayWords = shuffleArray(verbFamily[0].data.map((verb, i) => {
      return {...getGameplayWordFormat(verb), tense: verbFamily[0].tense.he};
    }))
    return gameplayWords
};

const getGameplayWordFormat = (verb) => {
    return {
        possessionInfo: {
            possession: verb.possession.possession,
            morphology: verb.possession.morphology,
          },
          conjugation: verb.conjugation,
          consonantCodes: verb.consonantCodes
    }
}

export default getGameplayWords;
