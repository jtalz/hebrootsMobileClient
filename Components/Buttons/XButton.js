import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { normalize } from '../../Actions/Normalize';
import { Colors, Typography } from '../../styles/index';

const XButton = ({ onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>X</Text>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    text: {
        ...Typography.regular,
        color: Colors.magenta,
        fontSize: normalize(20)
    }
})
 
export default XButton;