import React from "react";
import { Text } from "react-native";

const BlueLetter = ({ sign, fontSize }) => {
  return (
    <Text
      style={{ color: "black", fontSize: fontSize, fontFamily: "Poppins_300Light" }}
    >
      {sign}
    </Text>
  );
};

export default BlueLetter;
