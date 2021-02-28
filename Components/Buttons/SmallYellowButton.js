import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import { Colors, Spacing, Typography } from "../../styles";

const SmallYellowButton = ({
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
        backgroundColor,
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
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.35,
  },
  text: {
    ...Typography.semibold,
    ...Typography.size12,
    ...Colors.txtWhite,
  }
});

export default SmallYellowButton;