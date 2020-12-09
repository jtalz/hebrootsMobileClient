import React from 'react';
import {Image, View, Text} from 'react-native'

const DashedCircle = ({initial}) => {
    return ( 
        <View>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Bodoni 72', fontSize: 50, color: 'white'}}>{initial}</Text>
            </View>
        <Image 
                        style={{height: 110, width: 110}}
                        source={{uri: 'https://user-images.githubusercontent.com/31594943/100550730-d9064400-3249-11eb-9b44-4e0d472c7b64.png'}} />
        
        </View>
     );
}
 
export default DashedCircle;