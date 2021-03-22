import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography, Sizing } from "../../../styles";
import { DashedCircle } from "../../atoms";

const SettingsHeader = ({ firstName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={{ ...styles.text, color: Colors.white }}>Settings</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={{ ...styles.text, color: Colors.skyBlue }}>
          {firstName}
        </Text>
      </View>
      <DashedCircle initial={firstName.charAt(0)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Sizing.SCREEN_HEIGHT / 3,
    ...Spacing.centerCenter,
    paddingTop: 30,
    width: Sizing.SCREEN_WIDTH,
    ...Colors.bgHebroots,
    top: 0,
  },
  top: {
    flex: 4,
    ...Colors.bgHebroots,
    width: Sizing.SCREEN_WIDTH,
    justifyContent: "center",
  },
  bottom: {
    flex: 3,
    ...Colors.bgDarkGrey,
    width: Sizing.SCREEN_WIDTH,
    justifyContent: "flex-end",
  },
  text: {
    textAlign: "center",
    ...Typography.regular,
    ...Typography.size18,
  },
});

export default SettingsHeader;
