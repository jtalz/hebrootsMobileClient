import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";

/*  */

class IconButton extends React.Component{
  shouldComponentUpdate(nextProps) {
    if (nextProps.name !== this.props.name) {
      return true;
    } else {
      return false;
    }
  }
  render () {
  return (
    <View style={styles.container}>
      <View style={styles.blueCircle}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Image style={styles.icon} source={{ uri: this.props.imgUrl }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{this.props.name}</Text>
      <Text style={styles.smText}>({this.props.translation})</Text>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container: { 
    ...Spacing.centerCenter,
    marginHorizontal: 10
  },
  button: {
    ...Spacing.centerCenter,
    ...Spacing.m10,
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  blueCircle: {
    ...Spacing.centerCenter,
    ...Spacing.m10,
    borderColor: Colors.green,
    borderWidth: 3,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  text: {
    ...Typography.light,
    ...Typography.size12,
  },
  smText: {
    ...Typography.light,
    ...Typography.size10
  },
  icon: {
    height: 60,
    width: 60,
  },
});

export default IconButton;