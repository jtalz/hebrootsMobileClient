import React from "react";
import { Text } from "react-native";

const GreenLetter = ({ sign, fontSize }) => {
  return (
    <Text
      style={{ color: "#20BF55", fontSize: fontSize, fontFamily: "Poppins_300Light" }}
    >
      {sign}
    </Text>
  );
};

export default GreenLetter;
