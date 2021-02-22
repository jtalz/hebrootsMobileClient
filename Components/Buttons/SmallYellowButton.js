import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { normalize } from '../../Actions/Normalize';
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../Actions/ScreenDimensions'
import fonts from '../../styles/fontStyle';

const SmallYellowButton = props => {
    return (
        <TouchableOpacity style = {{...styles.btnBack, opacity: props.disabled ? 0.4 : 1, ...props.size, backgroundColor: props.backgroundColor}} onPress={() => props.onClick()} disabled = {props.disabled}>
            <Text style={{...fonts.en_light, fontSize: normalize(10), color: 'white'}}>
                {props.name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnBack: {
        backgroundColor: '#FFD350',
        borderRadius: 24,
        justifyContent:'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT*.05,
        width: SCREEN_WIDTH*.35,
    }
})

export default SmallYellowButton;