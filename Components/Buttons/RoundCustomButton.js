import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Actions/ScreenDimensions';

const RoundCustomButton = ({ name, onPress, imgUrl }) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.btnBack, borderWidth: 4, borderColor: '#e0e0e0', height: SCREEN_HEIGHT*.1, width: SCREEN_HEIGHT*.1, borderRadius: (SCREEN_HEIGHT*.1)/2, opacity: '30%'}}>
                <TouchableOpacity style={{...styles.btnBack} } 
                    onPress={onPress}>
                    <Image style={{height: SCREEN_HEIGHT*.08, width: SCREEN_HEIGHT*.08}} source={{ uri: imgUrl }} />
                </TouchableOpacity>
            </View>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize: 16}}>{name}</Text>
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