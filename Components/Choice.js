import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import onPanGestureEvent from "../Actions/Animations/onPanGestureEvent";
import timedAnimation from "../Actions/Animations/timedAnimation";
import getHebrewConsonantCodes from "../Actions/GetMethods/GetHebrewConsonantCodes";
import { normalize } from "../Actions/Normalize";
import { Colors, Typography } from "../styles";

const Choice = ({
  onHandlerStateChange,
  index,
  landingZone,
  clearOut,
  setSelected,
  choices,
  name,
  enabled,
}) => {
  const _translate = useState(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  )[0];

  const [layout, setLayout] = useState({ x: "", y: "" });

  const _onPanGestureEvent = onPanGestureEvent(_translate);

  const _onHandlerStateChange = onHandlerStateChange(layout, _translate, index);

  useEffect(() => {
    if (landingZone.occupier == index) {
      timedAnimation(_translate, 0, { x: 0, y: 0 }).start(() => {
        _translate.setOffset({ x: 0, y: 0 });
        _translate.setValue({ x: 0, y: 0 });
        clearOut();
        setSelected(null);
      });
    }
  }, [choices]);

  return (
    <View
      style={styles.main}
      onLayout={(event) => {
        setLayout({
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
        });
      }}
    >
      <PanGestureHandler
        onGestureEvent={_onPanGestureEvent}
        onHandlerStateChange={_onHandlerStateChange}
        hitSlop={{ horizontal: 10, vertical: 10 }}
        enabled={enabled}
      >
        <Animated.View>
          <TapGestureHandler
            onHandlerStateChange={_onHandlerStateChange}
            enabled={enabled}
          >
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: _translate.x,
                    },
                    {
                      translateY: _translate.y,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  width: normalize(getHebrewConsonantCodes(name).length * 15),
                  ...styles.choice,
                }}
                key={index}
              >
                <Text style={styles.text}>{name}</Text>
              </View>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 23,
  },
  choice: {
    height: 46,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 23,
    borderColor: Colors.skyBlue,
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { height: 1, width: 0 },
  },
  text: {
    fontSize: normalize(16),
    textAlign: "center",
    ...Typography.light,
  },
});

export default Choice;
