import { Animated } from 'react-native'

const timedAnimation = (elem, time, toValue) => {
    return Animated.timing(elem, {
        toValue,
        duration: time,
        useNativeDriver: true,
      });
}

export default timedAnimation;