import { Animated } from "react-native";

const onPanGestureEvent = (_translate) => {
    return Animated.event(
      [
        {
          nativeEvent: {
            translationX: _translate.x,
            translationY: _translate.y,
          },
        },
      ],
      { useNativeDriver: true }
    );
  };

  export default onPanGestureEvent;