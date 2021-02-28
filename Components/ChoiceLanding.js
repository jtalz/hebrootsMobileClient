import React from "react";
import { StyleSheet, View } from "react-native";
import { normalize } from "../Actions/Normalize";
import { Spacing } from "../styles";
import getHebrewConsonantCodes from '../Actions/GetMethods/GetHebrewConsonantCodes'

const ChoiceLanding = ({ verb }) => {
  const styles = StyleSheet.create({
    underline: {
      width: normalize(getHebrewConsonantCodes(verb).length * 20),
      height: 45,
      borderBottomColor: "black",
      borderWidth: 1,
      borderColor: "transparent",
      ...Spacing.centerCenter,
    },
  });
  return <View style={styles.underline}></View>;
};

export default ChoiceLanding;
