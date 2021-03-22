import React from "react";
import { View, Text } from "react-native";
import {
  HefilInflection,
  HitpaelInflection,
  NifalInflection,
  PaalInflection,
  PielInflection,
} from "./binyaanim";

const VERB_TYPES = {
  A: PaalInflection,
  B: NifalInflection,
  C: PielInflection,
  E: HitpaelInflection,
  F: HefilInflection,
};

const ConjugationText = (props) => {
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

export default ConjugationText;

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
