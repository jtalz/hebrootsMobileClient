import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import { Colors, Spacing, Typography } from "../../styles";
import _3DButton from "./_3DButton";
import { Fontisto } from "@expo/vector-icons";
import Bird from "../Characters/Bird";
import { State, TapGestureHandler } from "react-native-gesture-handler";

const LongRectangleButton = ({ name, details, onPress }) => (
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
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH / 1.3,
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
    width: SCREEN_WIDTH,
    justifyContent: "center",
    flexDirection: "row",
    ...Spacing.p5,
  },
});

export default LongRectangleButton;
