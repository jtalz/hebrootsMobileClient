import React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { Colors, Spacing } from "../../../styles";

const birdImages = [
  {
    name: "Standard",
    uri:
      "https://user-images.githubusercontent.com/31594943/89093398-b874cd00-d3c2-11ea-8193-b95631208ba1.png",
  },
  {
    name: "Young",
    uri:
      "https://user-images.githubusercontent.com/31594943/97096643-3270c700-163d-11eb-9b48-515715e07225.png",
  },
  {
    name: "Old",
    uri:
      "https://user-images.githubusercontent.com/31594943/97096644-3270c700-163d-11eb-9715-3711c2624686.png",
  },
];

const Bird = ({ size, birdType, style }) => {
  const uri = birdImages.find((img) => img.name == birdType).uri;

  return (
    <View
      style={{
        width: 70,
        height: 70,
        ...Spacing.centerCenter,
        //backgroundColor: Colors.lightGrey,
        borderRadius: 40,
        marginHorizontal: 10,
        alignSelf: 'center'
      }}
    >
      <Image
        style={{
          ...styles[size],
          resizeMode: "contain",
          ...style,
        }}
        source={{ uri }}
      />
    </View>
  );
};

export default Bird;

const styles = StyleSheet.create({
  Small: {
    width: 50,
    height: 50,
  },
  SmallPlus: {
    width: 120,
    height: 110,
  },
  Medium: {
    width: 150,
    height: 140,
  },
  Large: {
    width: 200,
    height: 190,
  },
});
