import React from 'react';
import { View } from 'react-native';
import {SCREEN_WIDTH} from '../Actions/GetMethods/ScreenDimensions'
import _3DButton from '../Components/Buttons/_3DButton';

const MultipleChoices = ({ choices, setSelected, selected, enabled, style }) => {
    return ( 
        <View style={{...style, marginVertical: 30, alignItems: 'center', justifyContent: 'center'}}>
            {
                choices.map((choice, index) => {
                    var _selected = index == selected;
                 return (
                    <_3DButton 
                        width={SCREEN_WIDTH-170}
                        height={46}
                        backgroundColor={_selected ? 'rgba(197, 249, 252, 0.77)' : 'white'}
                        borderWidth={2}
                        borderRadius= {10}
                        borderColor={_selected ? 'rgba(44, 128, 255, 0.72)' : '#C0C0C0'}
                        backgroundShadow={_selected ? 'rgba(44, 128, 255, 0.72)' : '#C0C0C0'}
                        backgroundDarker={_selected ? 'rgba(44, 128, 255, 0.72)' : '#C0C0C0'}
                        name = {choice} 
                        key={index} 
                        onPress={() => setSelected(index)} 
                        enabled={enabled} 
                        style={{marginVertical: 10}}
                        fontSize={28}
                    />
                 )
                })
            }
        </View>
     );
}
 
export default MultipleChoices;