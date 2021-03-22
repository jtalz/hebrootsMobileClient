import { Animated } from 'react-native'

const springAnimation = (elem, time, toValue) => {
    return Animated.spring(elem, {
        toValue,
        duration: time,
        useNativeDriver: true,
      });
}

export default springAnimation;