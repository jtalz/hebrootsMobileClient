import React from 'react';
import {View, Text} from 'react-native'
import { Sizing } from '../../../styles'

const DashedCircle = ({initial}) => {
    return ( 
        <View style={{position: 'absolute', top: Sizing.SCREEN_HEIGHT/6.5,borderWidth: 2, width: Sizing.SCREEN_WIDTH/4, height: Sizing.SCREEN_WIDTH/4, borderRadius: Sizing.SCREEN_WIDTH/6, alignItems: 'center',
        justifyContent: 'center', borderColor: 'white', backgroundColor:'white'}}>
            <Text style={{fontFamily: 'Bodoni 72', fontSize: 50, color: 'black'}}>{initial.toUpperCase()}</Text>
        </View>
     );
}
 
export default DashedCircle;