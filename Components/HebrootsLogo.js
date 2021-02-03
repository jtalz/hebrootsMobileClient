import React from 'react';
import { View } from 'react-native';
import { normalize } from '../Actions/Normalize';
import * as Animatable from 'react-native-animatable';

const HebrootsLogo = ({logoSize}) => {
    return ( 
        <View style={{alignSelf: 'center',flexDirection: 'row', height: normalize(70), alignItems: 'center', justifyContent: 'center'}}>
            <Animatable.View transition={['width', 'height']} duration={800} style={{backgroundColor: 'rgba(255, 215, 0, 1)', height: normalize(logoSize+30), width: normalize(logoSize+30),borderRadius: normalize(100), 
                alignSelf: 'center', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Animatable.Text transition='fontSize' duration={800} style={{fontFamily: 'Bodoni 72', fontSize: normalize(logoSize), color: 'white', paddingRight: 2}}>
                    heb
                </Animatable.Text>
            </Animatable.View>
            <Animatable.Text transition='fontSize' duration={800} style={{fontFamily: 'Bodoni 72', fontSize: normalize(logoSize), color: 'white'}}>
                roots
            </Animatable.Text>
        </View>
     );
}
 
export default HebrootsLogo