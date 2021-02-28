import React from "react";
import { Text } from "react-native";
import { Colors, Typography } from "../styles";

const GreenLetter = ({ sign, fontSize }) => {
  return (
    <Text
      style={{ fontSize, ...Typography.light, ...Colors.txtGreen }}
    >
      {sign}
    </Text>
  );
};

export default GreenLetter;
