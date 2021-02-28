import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import { Colors, Spacing, Typography } from "../../styles";
const RoundCustomButton = ({ name, onPress, imgUrl, translation }) => {
  return (
    <View style={{ ...Spacing.centerCenter }}>
      <View style={styles.blueCircle}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image style={styles.icon} source={{ uri: imgUrl }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>({translation})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Spacing.centerCenter,
    ...Spacing.m10,
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  blueCircle: {
    ...Spacing.centerCenter,
    ...Spacing.m10,
    ...Colors.borderSkyBlue,
    borderWidth: 2,
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_HEIGHT * 0.1,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
  },
  text: {
    ...Typography.light,
    ...Typography.size12,
  },
  icon: {
    height: SCREEN_HEIGHT * 0.08,
    width: SCREEN_HEIGHT * 0.08,
  },
});

export default RoundCustomButton;