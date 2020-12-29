import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../Actions/ScreenDimensions'

const SmallYellowButton = props => {
    return (
        <TouchableOpacity style = {{...styles.btnBack, opacity: props.disabled ? 0.4 : 1, ...props.size}} onPress={() => props.onClick()} disabled = {props.disabled}>
            <Text style={{fontFamily:'Nunito_300Light', fontSize: 18, lineHeight: 22}}>
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