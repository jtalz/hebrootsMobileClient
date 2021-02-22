import React from 'react';
import {Image, View, Text} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Actions/ScreenDimensions';

const DashedCircle = ({initial}) => {
    return ( 
        <View style={{position: 'absolute', top: SCREEN_HEIGHT/6.5,borderWidth: 2, width: SCREEN_WIDTH/4, height: SCREEN_WIDTH/4, borderRadius: SCREEN_WIDTH/6, alignItems: 'center',
        justifyContent: 'center', borderColor: 'white', backgroundColor:'white'}}>
                <Text style={{fontFamily: 'Bodoni 72', fontSize: 50, color: 'black'}}>{initial.toUpperCase()}</Text>
        </View>
     );
}
 
export default DashedCircle;