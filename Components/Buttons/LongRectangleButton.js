import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Actions/ScreenDimensions';
import _3DButton from './_3DButton';

const LongRectangleButton = ({ name, details, onPress }) => (
    <_3DButton
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
    />
  );

export default LongRectangleButton;