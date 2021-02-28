import React from "react";
import { Text } from "react-native";
import { Colors, Typography } from "../styles";

const BlueLetter = ({ sign, fontSize }) => {
  return (
    <Text style={{ fontSize, ...Typography.light, ...Colors.txtMagenta }}>
      {sign}
    </Text>
  );
};

export default BlueLetter;
