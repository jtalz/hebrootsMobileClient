import React, { useEffect, useState } from 'react';
import {TouchableOpacity, Text, Animated, StyleSheet} from 'react-native'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Actions/GetMethods/ScreenDimensions'

const appropriateCardOpacity = (visible, justSubmittedAndIsCorrect) => {
    if (justSubmittedAndIsCorrect){
        return new Animated.Value(1)
    }else if(!visible){
        return new Animated.Value(0)
    }else{
        return new Animated.Value(1)
    }
}

const MatchingCard = ({ item, dispatch }) => {
    
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
        onPress={() => dispatch({ type: "selectCard", payload: item })}
      >
        <Animated.View style={[{opacity: cardOpacity, height: '100%', width: '100%',justifyContent: "center",
        alignItems: "center"}, bgColor]}>
            <Text style={{ fontFamily: "Rubik_300Light", fontSize: 26 }}>
            {name}
            </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    matchingCard: {
        height: SCREEN_HEIGHT / 5,
        width: SCREEN_WIDTH / 3.4,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        marginVertical: 5,
        marginHorizontal: 5,
        
      }
  })

  export default MatchingCard;