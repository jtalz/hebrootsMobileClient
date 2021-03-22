import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Typography, Sizing } from "../../../styles";

const StadiumButton = ({
  disabled,
  size,
  backgroundColor,
  onClick,
  name,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...size,
        backgroundColor: backgroundColor,
        opacity: disabled ? 0.4 : 1,
      }}
      onPress={() => onClick()}
      disabled={disabled}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Spacing.centerCenter,
    borderRadius: 24,
    height: Sizing.SCREEN_HEIGHT * 0.05,
    width: Sizing.SCREEN_WIDTH * 0.35,
  },
  text: {
    ...Typography.semibold,
    ...Typography.size12,
    ...Colors.txtWhite,
  }
});

export default StadiumButton;