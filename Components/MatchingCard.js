import React, { useEffect, useState } from 'react';
import {TouchableOpacity, Text, Animated, StyleSheet} from 'react-native'
import { normalize } from '../Actions/Normalize';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Actions/ScreenDimensions'

const appropriateCardOpacity = (visible, justSubmittedAndIsCorrect) => {
    if (justSubmittedAndIsCorrect){
        return new Animated.Value(1)
    }else if(!visible){
        return new Animated.Value(0)
    }else{
        return new Animated.Value(1)
    }
}

const MatchingCard = ({ item, selectCard }) => {
    
    const { selected, visible, name, justSubmitted } = item;

    var disabled = !visible;

    const justSubmittedAndIsCorrect = justSubmitted && !visible;

    const justSubmittedAndIsIncorrect = justSubmitted && visible;

    const cardOpacity = useState(appropriateCardOpacity(visible, justSubmittedAndIsCorrect))[0]

    const animatedValue = new Animated.Value(90)

    const fadeCardOut = () => {
        Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
        }).start()
    }
    
    const interpolateToWhite = () => {
        Animated.timing(animatedValue, {
            toValue: 255,
            duration: 700, 
            useNativeDriver: false
        }).start()
    }

    const interpolateColor = animatedValue.interpolate({
        inputRange: [0, 250],
        outputRange: ['rgb(250,90,90)', 'rgb(250, 250, 250)']
    })

    const bgColor = {backgroundColor: appropriateCardColor(selected, justSubmittedAndIsCorrect, justSubmittedAndIsIncorrect)};

    function appropriateCardColor(selected, justSubmittedAndIsCorrect, justSubmittedAndIsIncorrect){
        if (justSubmittedAndIsCorrect){
            return '#2eff35'
        }else if(justSubmittedAndIsIncorrect){
            return interpolateColor;
        }else if(selected){
            return '#f8ff78'
        }else{
            return 'white'
        }
    }

    useEffect(()=> {
        if( justSubmittedAndIsCorrect ){
            fadeCardOut();
        }else if( justSubmittedAndIsIncorrect ){
            interpolateToWhite();
        }
    })

    return (
      <TouchableOpacity
        style={{ ...styles.matchingCard }}
        disabled={disabled}
        onPress={() => selectCard(item)}
      >
        <Animated.View style={[{opacity: cardOpacity, width: '100%', height: '100%', borderRadius: SCREEN_HEIGHT/18, justifyContent: 'center'}, bgColor]}>
            <Text style={{ fontFamily: "Rubik_300Light", fontSize: normalize(16), alignSelf: 'center' }}>
            {name}
            </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    matchingCard: {
        height: SCREEN_HEIGHT / 12,
        width: SCREEN_WIDTH / 3.4,
        borderWidth: 2,
        borderColor: '#e8e8e8',
        borderRadius: SCREEN_HEIGHT/ 18,
        marginVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
      }
  })

  export default MatchingCard;