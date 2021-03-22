import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Colors, Typography } from '../../../styles';

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
        ...Typography.size18
    }
})
 
export default XButton;