import React from "react";
import { StyleSheet, View } from "react-native";
import { getHebrewConsonantCodes } from "../../../services";
import { Spacing, Sizing } from "../../../styles";

const Underline = ({ verb }) => {
  const styles = StyleSheet.create({
    underline: {
      width: Sizing.normalize(getHebrewConsonantCodes(verb).length * 20),
      height: 45,
      borderBottomColor: "black",
      borderWidth: 1,
      borderColor: "transparent",
      ...Spacing.centerCenter,
    },
  });
  return <View style={styles.underline}></View>;
};

export default Underline;
