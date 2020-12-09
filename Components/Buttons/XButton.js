import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const XButton = ({ onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 36, fontFamily: 'Bodoni 72', color: 'gray'}}>X</Text>
        </TouchableOpacity>
     );
}
 
export default XButton;