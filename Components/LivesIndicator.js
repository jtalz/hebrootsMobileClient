import React from 'react';
import { Image, View, Text } from 'react-native';

const LivesIndicator = ({ nLives }) => {
    return ( 
        <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <Image 
                source={{uri: 'https://user-images.githubusercontent.com/31594943/97501456-ae258900-1947-11eb-8ca5-eadf68a3ceee.png'}}
                style={{height: 40, width: 40}}
            />
            <Text style={{fontSize: 24, fontFamily: 'Bodoni 72', marginLeft: 5}}>{nLives}</Text>
        </View>
     );
}
 
export default LivesIndicator;