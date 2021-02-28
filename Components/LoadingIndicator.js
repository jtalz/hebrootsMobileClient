import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import { Sizing, Spacing } from "../styles";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        ...Spacing.centerCenter,
        ...Sizing.halfScreenHeight,
        width: SCREEN_WIDTH
    }
})

export default LoadingIndicator;
