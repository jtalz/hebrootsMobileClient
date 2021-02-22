import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Actions/ScreenDimensions';
import fonts from '../../styles/fontStyle';
import {normalize} from '../../Actions/Normalize'
const RoundCustomButton = ({ name, onPress, imgUrl, translation }) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.btnBack, borderWidth: 2, borderColor: '#4294DB', height: SCREEN_HEIGHT*.1, width: SCREEN_HEIGHT*.1, borderRadius: (SCREEN_HEIGHT*.1)/2, opacity: '30%'}}>
                <TouchableOpacity style={{...styles.btnBack} } 
                    onPress={onPress}>
                    <Image style={{height: SCREEN_HEIGHT*.08, width: SCREEN_HEIGHT*.08}} source={{ uri: imgUrl }} />
                </TouchableOpacity>
            </View>
            <Text style={{fontFamily: 'Poppins_300Light', fontSize: normalize(12) }}>{name}</Text>
            <Text style={{fontFamily: 'Poppins_300Light', fontSize: normalize(10)}}>({translation})</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBack: {
        borderRadius: 40,
        justifyContent:'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
    }
})

export default RoundCustomButton;