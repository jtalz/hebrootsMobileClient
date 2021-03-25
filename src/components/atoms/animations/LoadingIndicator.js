import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors, Sizing, Spacing } from "../../../styles";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.hebrootsBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        ...Spacing.centerCenter,
        ...Sizing.halfScreenHeight,
        width: Sizing.SCREEN_WIDTH
    }
})

export default LoadingIndicator;
