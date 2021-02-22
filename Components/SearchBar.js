import React from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
import {EvilIcons} from '@expo/vector-icons'; 
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { normalize } from '../Actions/Normalize';
import fonts from '../styles/fontStyle';

const SearchBar = props => {
    const [value, onChangeText] = useState('');
    return (
        <View style={styles.searchSection}>
            <TouchableOpacity onPress={()=>props.onEnter(value)}>
                <EvilIcons style={styles.searchIcon} name="search" size={24} color="#000"/>
            </TouchableOpacity>
            <TextInput
                style={{...styles.input}}
                placeholder="search for a verb..."
                onChangeText = {text=> onChangeText(text)}
                underlineColorAndroid="transparent"
                value = {value}
                onEndEditing={()=>props.onEnter(value)}
            />
            <TouchableOpacity onPress={()=>onChangeText('')}>
                <Text style={{fontFamily: 'Poppins_300Light', fontSize:normalize(12)}}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Poppins_300Light'
  },
  searchIcon: {

  },
  input: {
      width:'70%',
      backgroundColor: 'transparent',
      color: '#424242',
      textAlign: 'left',
      marginHorizontal: 10,
      fontSize: normalize(12)
  },
  });

export default SearchBar;