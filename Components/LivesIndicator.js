import React, { useEffect, useState } from 'react';
import { Image, View, Text, Animated } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

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
        <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <Animated.View style={{
                opacity: heartPos, 
                transform: [{
                translateY: heartPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                })
            }]}}>
                <Image 
                    source={{uri: 'https://user-images.githubusercontent.com/31594943/97501456-ae258900-1947-11eb-8ca5-eadf68a3ceee.png'}}
                    style={{height: 40, width: 40}}
                />
            </Animated.View>
            <Text style={{fontSize: 24, fontFamily: 'Bodoni 72', marginLeft: 5}}>{nLives}</Text>
        </View>
     );
}
 
export default LivesIndicator;