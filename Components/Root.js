import React from "react";
import { Text, View } from "react-native";
import ROOT_TYPES from "../Constants/ROOT_TYPES";

const Root = ({ base_form, pattern }) => {
  const root = generateRoot(base_form, pattern);
  const getDottedNotation = () => {
    try {
      return root.getRootFormat();
    } catch (err) {
      return <Text>{base_form}</Text>;
    }
  };
  return <View>{getDottedNotation()}</View>;
};

const generateRoot = (base_form, pattern) => {
  for (const [patternCode, verbType] of Object.entries(ROOT_TYPES)) {
    if (pattern == patternCode) {
      return new verbType(base_form);
    }
  }
};

export default Root;
