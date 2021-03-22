import React, { useEffect, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../../styles";
import { timedAnimation } from "../../../services";

const LivesIndicator = ({ nLives }) => {
  const heartPos = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.sequence([
      timedAnimation(heartPos, 800, 0),
      timedAnimation(heartPos, 0, 1),
    ]).start();
  }, [nLives]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...Spacing.centerCenter,
          opacity: heartPos,
          transform: [
            {
              translateY: heartPos.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <AntDesign name="heart" color="red" size={35} />
        <Text style={styles.text}>{nLives}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.semibold,
    ...Colors.txtWhite,
    ...Typography.size12,
    position: "absolute",
  },
  container: {
    ...Spacing.row,
    ...Spacing.centerCenter,
  },
});

export default LivesIndicator;