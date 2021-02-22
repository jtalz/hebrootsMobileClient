import React from "react";
import { Text, View,TouchableOpacity } from "react-native";
import { normalize } from "../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import _3DButton from "./_3DButton";

const LongRectangleButton = ({ name, details, onPress }) => (
  <TouchableOpacity onPress={onPress}>
  <View
    style={{
      height: SCREEN_HEIGHT / 8,
      padding: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4294DB",
      margin: 10,
      width: SCREEN_WIDTH / 2.5,
    }}
  >
    <Text style={{ fontFamily: 'Poppins_300Light', fontSize: normalize(12), color: 'white' }}>{name}</Text>
    {details.map((detail,index)=><Text key={index} style={{ fontFamily: 'Poppins_300Light', fontSize: normalize(12), color: 'white' }}>{detail}</Text>)}
  </View>
  </TouchableOpacity>
);

export default LongRectangleButton;

/* <_3DButton
      width={SCREEN_WIDTH - 60}
      height={SCREEN_HEIGHT / 11}
      textSize={24}
      color={"black"}
      backgroundColor={"white"}
      borderWidth={1}
      borderRadius={5}
      borderColor={"#C0C0C0"}
      backgroundShadow={"white"}
      backgroundDarker={"#C0C0C0"}
      backgroundActive={"#FFD350"}
      onPress={onPress}
      name={name}
      details={details}
      enabled={true}
      style={{ marginVertical: 10 }}
      fontSize={SCREEN_HEIGHT / 55}
    /> */
