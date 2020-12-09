import React from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = props => {
    const [value, onChangeText] = useState('');
    return (
        <View style={styles.searchSection}>
            <TouchableOpacity onPress={()=>onChangeText('')}>
                <Text style={{fontSize:22, fontFamily: 'Rubik_300Light'}}>X</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="חיפוש"
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
      fontSize: 18,
      fontFamily: 'Rubik_300Light'
  },
  });

export default SearchBar;