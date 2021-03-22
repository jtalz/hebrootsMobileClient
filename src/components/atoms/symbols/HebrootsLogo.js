import React from "react";
import { Image, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Spacing, Sizing } from "../../../styles";

const HebrootsLogo = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        flexDirection: "row",
        height: Sizing.normalize(70),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animatable.View
        transition={["width", "height"]}
        duration={800}
        style={{
          alignSelf: "center",
          ...Spacing.centerCenter,
        }}
      >
        <Image
          source={require("../../../../assets/hebrootsLogo.png")}
          style={{ width: Sizing.SCREEN_WIDTH / 4 }}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};

export default HebrootsLogo;
