import React from 'react';
import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Actions/GetMethods/ScreenDimensions';
import Conjugation from './Conjugation'

import {normalize} from '../Actions/Normalize'

const SentenceWithVerb = ({ 
    possession, 
    tense, 
    verb, 
    answered, 
    morphology, 
    style, 
    tense_en, 
    pattern, 
    noun_phrase, 
    gameStyle,
    handleTextInput,
    inputValue,
    inputEnabled
  }) => {
  
  const getProperInputFormat = (gameStyle) => {
    if (gameStyle== "MultiChoiceQuiz"){
      return answered !== 'unanswered' ? 
      <View style={{width: (verb.length*normalize(20))/2, height: 45, borderBottomColor: 'black', borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
      <Conjugation 
        conjugation={verb} 
        morphology={morphology} 
        pattern = {pattern}
        tense = {tense_en}
        fontSize = {normalize(20)}
        /></View> : <View style={{width: (verb.length*normalize(20))/2, height: 45, borderBottomColor: 'black', borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
      </View>
    }else if(gameStyle == "Writing"){
      return answered !== 'unanswered' ? 
      <View style={{width: (verb.length*normalize(20))/2, height: 45, borderBottomColor: 'black', borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
      
      <Conjugation 
        conjugation={verb} 
        morphology={morphology} 
        pattern = {pattern}
        tense = {tense_en}
        fontSize = {normalize(20)}
        /></View> : 
        <View style={{width: (verb.length*normalize(20))/2, height: 45, borderBottomColor: 'black', borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
      
        <TextInput
            style={{...styles.text, width: '100%', textAlign: 'center'}}
            placeholder=""
            onChangeText={(text) => handleTextInput(text)}
            underlineColorAndroid="transparent"
            allowFontScaling={false}
            value={inputValue}
            editable={inputEnabled}
            autoFocus={true}
          />
          </View>
    }
}

  return ( 
        <View style={{ ...style, alignItems:'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', margin: SCREEN_HEIGHT/40, justifyContent: 'center'}}>
          </View>
            <View style={{flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' , marginVertical: 20, width: SCREEN_WIDTH, flexWrap:'nowrap'}}>
                <Text style={styles.text}>
                    { function(){
                switch(morphology){
                  case 'FIRST+F+SINGULAR': 
                    return possession + " (נ)";
                    break;
                  case 'FIRST+M+SINGULAR': 
                    return possession + " (ז)";
                    break;
                  case 'FIRST+F+PLURAL': 
                    return possession + " (נ)";
                    break;
                  case 'FIRST+M+PLURAL': 
                    return possession + " (ז)";
                    break;
                  default : 
                    return possession;
                    break;
                }
              }() }
                </Text>
                {getProperInputFormat(gameStyle)}
                {noun_phrase !== null ? 
                <View style={{flexDirection: 'column', alignItems: 'flex-end', marginTop: 0}}>
                  
                  <Text style={{...styles.text}}>{noun_phrase.phrase}</Text>
                  <Image style={{height: 75, width: 75, alignSelf: 'flex-start', marginBottom: -75, marginLeft: 20}} source={{uri: noun_phrase.img}} />
                </View> : 
                null
                }
                
            </View>
        </View>
     );
}


 
const styles = StyleSheet.create({
    text: {
        marginHorizontal: 24,
        fontFamily: 'Rubik_300Light',
        fontSize: normalize(20)
    }
})

export default SentenceWithVerb;