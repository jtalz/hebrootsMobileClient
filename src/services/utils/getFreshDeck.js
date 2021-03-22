import seperateInflectionsFromPronouns from "../reducers/matching/SeperateInflectionsFromPronouns";
import compose from "./compose";
import getNRandomUniqueElements from "./getNRandomUniqueElements";
import shuffleArray from "./shuffleArray";


const getDeck = (deck) => deck;

const getFreshDeck = (data) => {
  // returns array nTotalDesired of { _id: Number, name: String (conjugation), pair: Number, visible: Boolean, selected: Boolean }
  return compose(
    getDeck,
    shuffleArray,
    seperateInflectionsFromPronouns,
    getNRandomUniqueElements
  )({
    usedElements: [],
    data,
    nCardsRequested: 3,
    type: "regular",
  });
};

export default getFreshDeck;