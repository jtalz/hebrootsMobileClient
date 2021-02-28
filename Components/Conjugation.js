import React from "react";
import { View, Text } from "react-native";
import VERB_TYPES from "../Constants/VERB_TYPES";

const Conjugation = (props) => {
  const verb = createVerbObject(props);
  const getConjugation = () => {
    try {
      return verb.getFormattedText();
    } catch (err) {
      return <Text>{props.conjugation}</Text>;
    }
  };
  return <View>{getConjugation()}</View>;
};

export default Conjugation;

const createVerbObject = ({
  conjugation,
  morphology,
  pattern,
  tense,
  fontSize,
}) => {
  for (const [patternCode, verbType] of Object.entries(VERB_TYPES)) {
    if (pattern == patternCode) {
      return new verbType({ conjugation, morphology, tense, fontSize });
    }
  }
};
