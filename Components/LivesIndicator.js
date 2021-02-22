import React, { useEffect, useState } from 'react';
import { Image, View, Text, Animated } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { normalize } from '../Actions/Normalize';
import {AntDesign} from '@expo/vector-icons';

const LivesIndicator = ({ nLives }) => {

    const heartPos = useState(new Animated.Value(1))[0]

    useEffect(()=>{
        Animated.sequence([
            Animated.timing(heartPos, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(heartPos, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true
            })
        ]).start();
    }, [nLives])

    return ( 
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={{
                alignItems: 'center', justifyContent: 'center',
                opacity: heartPos, 
                transform: [{
                translateY: heartPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                }),
                
            }]}}>
                {/* <Image 
                    source={require('../assets/heart.png')}
                    style={{}}
                /> */}
                <AntDesign name='heart' color='red' size={35} />
                <Text style={{fontSize: normalize(12), position: 'absolute',fontFamily: 'Poppins_600SemiBold', color: 'white'}}>{nLives}</Text>
            </Animated.View>
            
        </View>
     );
}
 
export default LivesIndicator;