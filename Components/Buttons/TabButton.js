import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../styles";
import { SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";

const TabButton = ({
  title,
  isOpen,
  transliteration,
  closePracticeTab,
  openPracticeTab,
}) => {
  return (
    <TapGestureHandler
      onHandlerStateChange={({ nativeEvent }) =>
        nativeEvent.state === State.ACTIVE
          ? isOpen
            ? closePracticeTab()
            : openPracticeTab()
          : null
      }
      maxDurationMs={1000}
    >
      <View style={styles.main}>
        <Text style={styles.text}>{transliteration}</Text>
        <Text style={styles.text}>{title}</Text>
        <View style={{ position: "absolute", right: 15 }}>
          <AntDesign
            name={isOpen ? "down" : "up"}
            color={Colors.skyBlue}
            size={20}
          />
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  main: {
    height: SCREEN_HEIGHT / 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    ...Colors.bgWhite,
    borderColor: Colors.skyBlue,
    borderWidth: 1,
    margin: 10,
    ...Spacing.row,
  },
  text: {
    ...Typography.regular,
    ...Typography.size16,
    color: Colors.skyBlue,
    textAlign: "right",
  },
});

export default TabButton;
