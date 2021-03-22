import {Dimensions} from 'react-native';
import { Platform, PixelRatio } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;

export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const width100 = {
    width: '100%'
}

export const f1 = {flex: 1}

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}