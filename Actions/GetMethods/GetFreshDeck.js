import compose from "../Compose";
import seperateInflectionsFromPronouns from "../SeperateInflectionsFromPronouns";
import shuffleArray from "../ShuffleArray";
import getNRandomUniqueElements from "./GetNRandomUniqueElements";

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