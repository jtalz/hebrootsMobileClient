import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../styles/index";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";

const TensePagination = ({ activeIndex, nextCard, prevCard }) => {
  return (
    <View style={styles.tenseRuler}>
      <TouchableOpacity onPress={prevCard} style={{}}>
        <AntDesign name="caretleft" size={24} color={Colors.skyBlue} />
      </TouchableOpacity>
      <Text
        style={{
          color: activeIndex == 0 ? Colors.skyBlue : "black",
          ...styles.text,
        }}
      >
        עבר
      </Text>
      <Text
        style={{
          color: activeIndex == 1 ? Colors.skyBlue : "black",
          ...styles.text,
        }}
      >
        הווה
      </Text>
      <Text
        style={{
          color: activeIndex == 2 ? Colors.skyBlue : "black",
          ...styles.text,
        }}
      >
        עתיד
      </Text>
      <TouchableOpacity onPress={nextCard}>
        <AntDesign name="caretright" size={24} color={Colors.skyBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.size18,
    ...Spacing.m5,
    ...Typography.light,
  },
  tenseRuler: {
    flexDirection: "row",
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: SCREEN_WIDTH / 1.3,
  },
});

export default TensePagination;