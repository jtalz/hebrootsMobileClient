import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Sizing, Spacing, Typography } from "../../../styles";

const SearchBarInput = (props) => {
  const [value, onChangeText] = useState("");
  return (
    <View style={styles.searchSection}>
      <TouchableOpacity onPress={() => props.onEnter(value)}>
        <EvilIcons
          style={styles.searchIcon}
          name="search"
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="search for a verb..."
        onChangeText={(text) => onChangeText(text)}
        underlineColorAndroid="transparent"
        value={value}
        onEndEditing={() => props.onEnter(value)}
      />
      <TouchableOpacity onPress={() => onChangeText("")}>
        <Text style={styles.text}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.light,
    ...Typography.size12,
  },
  searchSection: {
    ...Sizing.f1,
    ...Spacing.row,
    ...Spacing.justifyBtwn,
    ...Spacing.alignCenter,
    ...Colors.bgTransparent,
    ...Typography.light,
  },
  input: {
    width: "70%",
    ...Colors.bgTransparent,
    ...Colors.txtMagenta,
    ...Typography.taLeft,
    ...Spacing.mh10,
    ...Typography.size12,
  },
});

export default SearchBarInput;
