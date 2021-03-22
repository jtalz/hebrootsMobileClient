import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, Spacing, Typography, Sizing } from "../../../styles";
import { Fontisto } from "@expo/vector-icons";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { Bird } from "../symbols";

const LessonButton = ({ name, details, onPress }) => (
  <TapGestureHandler
    onHandlerStateChange={({ nativeEvent }) =>
      nativeEvent.state === State.ACTIVE ? onPress() : null
    }
    maxDurationMs={1000}
  >
    <View style={styles.container}>
      <Bird size="Small" birdType="Standard" style={{ left: 0 }} />
      <View style={styles.button}>
        <View>
          <Text style={styles.text}>{name}</Text>
          {details.map((detail, index) => (
            <Text key={index} style={styles.text}>
              {detail}
            </Text>
          ))}
        </View>
        <Fontisto name="angle-right" size={12} color="black" />
      </View>
    </View>
  </TapGestureHandler>
);

const styles = StyleSheet.create({
  button: {
    ...Spacing.justifyBtwn,
    ...Spacing.alignCenter,
    ...Colors.bgWhite,
    ...Spacing.p5,
    height: Sizing.SCREEN_HEIGHT / 8,
    width: Sizing.SCREEN_WIDTH / 1.3,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    ...Spacing.row,
    alignSelf: "flex-end",
  },
  text: {
    ...Typography.light,
    ...Typography.size12,
    color: Colors.magenta,
  },
  container: {
    width: Sizing.SCREEN_WIDTH,
    justifyContent: "center",
    flexDirection: "row",
    ...Spacing.p5,
  },
});

export default LessonButton;
