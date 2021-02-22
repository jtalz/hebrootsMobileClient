import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { normalize } from '../../Actions/Normalize';

const XButton = ({ onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: normalize(20) , fontFamily: 'Poppins_400Regular', color: 'gray'}}>X</Text>
        </TouchableOpacity>
     );
}
 
export default XButton;