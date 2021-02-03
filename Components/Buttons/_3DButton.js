import React from 'react';
import { Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button'
import fonts from '../../Style/fontStyle';

const _3DButton = (
    { 
        width,
        height, 
        textSize,
        color,
        backgroundColor,
        borderWidth,
        borderRadius,
        borderColor,
        backgroundShadow,
        backgroundDarker,
        onPress,
        name, 
        enabled, 
        style,
        margins, 
        children,
        details,
        fontSize,
        backgroundActive
    }
    ) => {

    return ( <View style={{...style}}>
        <AwesomeButton
            primary
            width= {width}
            height= {height}
            textFontFamily={'Rubik_300Light'}
            textSize={textSize}
            textColor={color}
            backgroundColor={backgroundColor}
            borderWidth={borderWidth}
            borderRadius= {borderRadius}
            borderColor={borderColor}
            backgroundShadow={backgroundShadow}
            backgroundDarker={backgroundDarker}
            backgroundActive = {backgroundActive}
            onPress={next=>{
                onPress();
                next();
            }}
            disabled={!enabled}
            style={{...margins}}
        >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...fonts.he_light, fontSize: fontSize, }}> { name }</Text>
            {details !== undefined ? 
                details.map(detail => <Text key={detail} style={{...fonts.en_light, fontSize: fontSize, }}> { detail }</Text>) : 
                null
            }
            </View>
        </AwesomeButton>
        {children}
        </View>
        
     );
}
 
export default _3DButton;