import React from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
import { useState } from 'react'

const GameInput = props => {
    const [value, setValue] = useState('');

    const handleOnChange = (text) => {
        props.checkAnswer(text) ? onCorrectAnswer() : setValue(text);
    }

    const onCorrectAnswer = () => {
        
        props.handleCorrectAnswer()
        setValue('');
        //perform animation
    }

    return (
        <View style={styles.searchSection}>
            <TextInput
                style={styles.input}
                placeholder=""
                onChangeText = {text=> handleOnChange(text)}
                underlineColorAndroid="transparent"
                allowFontScaling = {false}
                value = {value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1
  },
  input: {
      width:'50%',
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      backgroundColor: '#fff',
      color: '#424242',
      borderRadius: 2,
      borderBottomWidth: 2,
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Bodoni 72'
  },
  });

export default GameInput;