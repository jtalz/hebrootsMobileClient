import React from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { normalize } from '../Actions/Normalize';
import fonts from '../Style/fontStyle';

const SearchBar = props => {
    const [value, onChangeText] = useState('');
    return (
        <View style={styles.searchSection}>
            <TouchableOpacity onPress={()=>onChangeText('')}>
                <Text style={{...fonts.en_light, fontSize:22}}>X</Text>
            </TouchableOpacity>
            <TextInput
                style={{...styles.input, ...value == '' ? fonts.en_light : fonts.he_light}}
                placeholder="search for a verb..."
                onChangeText = {text=> onChangeText(text)}
                underlineColorAndroid="transparent"
                value = {value}
                onEndEditing={()=>props.onEnter(value)}
            />
            <TouchableOpacity onPress={()=>props.onEnter(value)}>
                <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  searchIcon: {

  },
  input: {
      width:'60%',
      backgroundColor: 'transparent',
      color: '#424242',
      textAlign: 'right',
      marginHorizontal: 10,
      fontSize: normalize(12)
  },
  });

export default SearchBar;