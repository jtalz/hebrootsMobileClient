import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography, Sizing } from "../../../styles";

const ReadOnly = ({ option }) => (
  <View style={styles.optionRow}>
    <Text style={styles.settingsText}>{option.name}</Text>
    <Text style={styles.detailsText}>{option.status}</Text>
  </View>
);

const Pressable = ({ option }) => (
  <TouchableOpacity style={styles.optionRow} onPress={option.onPress}>
    <Text style={styles.settingsText}>{option.name}</Text>
    {option.status !== undefined ? (
      <Text style={styles.detailsText}>{option.status}</Text>
    ) : null}
  </TouchableOpacity>
);

const ToggleTab = ({ option }) => (
  <View style={styles.optionRow}>
    <Text style={styles.settingsText}>{option.name}</Text>
    <Switch
    /* trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e" */
    //onValueChange={toggleSwitch}
    //value={option.status}
    />
  </View>
);

const EmptyTab = ({}) => <View style={styles.optionRow}></View>;

const SettingsRow = ({ option }) => {
  if (option.type == "read-only") {
    return <ReadOnly option={option} />;
  } else if (option.type == "pressable") {
    return <Pressable option={option} />;
  } else if (option.type == "toggle") {
    return <ToggleTab option={option} />;
  } else {
    return <EmptyTab />;
  }
};

const styles = StyleSheet.create({
  detailsText: {
    color: Colors.skyBlue,
  },
  settingsText: {
    ...Typography.regular,
    ...Typography.size12,
  },
  optionRow: {
    backgroundColor: "white",
    paddingHorizontal: Sizing.SCREEN_WIDTH / 15,
    height: Sizing.SCREEN_HEIGHT / 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    borderRadius: 10,
  },
});

export default SettingsRow;
