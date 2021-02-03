import React, {useReducer, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View, Animated, TextInput } from "react-native";
import getGameplayWords from "../../../Actions/GetMethods/GetGameplayWords.js";
import isCorrectConsonants from "../../../Actions/CheckAnswer.js";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import LivesIndicator from "../../../Components/LivesIndicator";
import XButton from "../../../Components/Buttons/XButton";
import HebrootsModal from "../../../Components/Modals/HebrootsModal";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../../Actions/ScreenDimensions";
import { navigateToPattern } from "../../../Actions/NavigateTo";
import { StackActions } from "@react-navigation/native";
import _3DButton from "../../../Components/Buttons/_3DButton";
import { AntDesign, Feather, Ionicons  } from '@expo/vector-icons'; 
import SmallYellowButton from '../../../Components/Buttons/SmallYellowButton'
import {normalize} from '../../../Actions/Normalize'
import SentenceWithVerb from "../../../Components/SentenceWithVerb";

function getInitialState(verbFamily) {
    return {
      verbData: verbFamily,
      questionStatus: "unanswered",
      activeVerb: {
        nActiveVerb: 0,
        conjugation: verbFamily[0].conjugation
      },
      inputEnabled: true,
      continueEnabled: false,
      progress: 0,
      lives: 5,
      progressIncrementer: 100 / verbFamily.length,
      modalVisibility: {
        exit: false,
        grade: false,
        failed: false,
        passed: false,
        instructions: true,
      },
      inputValue: ""
    };
  }

const writingReducer = (state, action) => {
    if (action.type == "handleTextInput"){
        return isCorrectConsonants(action.payload, state.activeVerb.conjugation) ?
            {
                ...state, 
                inputEnabled: false, 
                inputValue: state.activeVerb.conjugation, 
                questionStatus: "correct", 
                progress : state.progress+ state.progressIncrementer,
                continueEnabled : true
            } :
            {
                ...state,
                inputValue: action.payload
            }
    }else if (action.type == "giveUp"){
        return state.lives - 1 == 0 ?
            {
                ...state, 
                inputEnabled: false, 
                modalVisibility: {
                    ...state.modalVisibility, 
                    failed: true
                },
                questionStatus: "gaveUp",
                inputValue: state.activeVerb.conjugation,
                lives: state.lives-1
            }
            : 
            {
                ...state, 
                inputEnabled: false, 
                questionStatus: "gaveUp",
                inputValue: state.activeVerb.conjugation,
                verbData: state.verbData.concat(state.verbData[state.activeVerb.nActiveVerb]),
                continueEnabled: true,
                lives: state.lives-1
            }
    }else if (action.type == "moveToNextQuestion"){
        return state.activeVerb.nActiveVerb == state.verbData.length-1 ? 
        {
            ...state, 
            modalVisibility:{
                ...state.modalVisibility, 
                passed: true
            }
        } 
        :
        { 
            ...state, 
            questionStatus: 'unanswered',
            inputEnabled: true,
            continueEnabled : false,
            activeVerb : {
                nActiveVerb : state.activeVerb.nActiveVerb+1,
                conjugation : state.verbData[state.activeVerb.nActiveVerb+1].conjugation
            },
            inputValue: ""
        }
    }else if (action.type == 'replay'){
        return {...action.payload}
    }else if (action.type == 'close'){
        return {...state, modalVisibility: {exit: false, grade: false, failed: false, passed: false, instructions: false}}
    }else if (action.type == 'exit' ){
        return {...state, modalVisibility: {...state.modalVisibility, exit: true}}
    }
}

const Writing = ({ route, navigation }) => {

    const {
        family,
        infinitive,
        gameStyle,
        tense_en,
        pattern,
        noun_phrase,
      } = route.params;

    const [state, dispatch] = useReducer(
        writingReducer,
        getGameplayWords(family),
        getInitialState
      );

    //handle text input (change/attempt at answer)
    //payload = text input value 
    const handleTextInput = (text) => {
        dispatch({type : "handleTextInput", payload: text})
    }

    //ask for hint -> lose a life and give answer
    const giveUp = () => {
        dispatch({type : "giveUp"})
    }
    //move to next question
    const moveToNextQuestion = () => {
        dispatch({ type: "moveToNextQuestion" });
    }

    const answerContainerX = useState(new Animated.Value(1))[0];

  const slideInLeft = () => {
    //disableCheck();
    Animated.sequence([
      Animated.timing(answerContainerX, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(answerContainerX, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      moveToNextQuestion();
      Animated.spring(answerContainerX, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

    return ( 


    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <HebrootsModal
          message="Are you sure you would like to exit? Your progress will not be saved."
          buttons={[
            {
              name: "Yes I'm sure",
              callback: () => {
                dispatch({ type: "close" });
                navigation.navigate("UserProgress");
              },
            },
            {
              name: "No, I'd like to stay",
              callback: () => {
                dispatch({ type: "close" });
              },
            },
          ]}
          visibility={state.modalVisibility.exit}
        />
        <HebrootsModal
          message="Oh no! You've lost all of your lives. Try studying one more time before practicing again!"
          buttons={[
            {
              name: "Go back to study",
              callback: () => {
                dispatch({ type: "close" });
                navigateToPattern(navigation, "LessonSelection", {});
              },
            },
            {
              name: "Try again",
              callback: () => {
                replay();
              },
            },
          ]}
          visibility={state.modalVisibility.failed}
        />
        <HebrootsModal
          message="Great job! You know your verb conjugations. Return to the pattern screen to learn another one."
          buttons={[
            {
              name: "Learn something else",
              callback: () => {
                dispatch({ type: "close" });
                navigation.dispatch(StackActions.popToTop());
                navigateToPattern(navigation, "LessonSelection", {});
              },
            },
          ]}
          visibility={state.modalVisibility.passed}
        />

        <HebrootsModal
          message={`Welcome to the Quiz. Try your best to select the appropriate conjugation of the verb ${infinitive} with their corresponding pronoun (like אני, אתה, הוא). Good luck!`}
          buttons={[
            {
              name: "Let's go!",
              callback: () => {
                dispatch({ type: "close" });
              },
            },
          ]}
          visibility={state.modalVisibility.instructions}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-around",
            width: SCREEN_WIDTH
          }}
        >
          <XButton onPress={() => dispatch({ type: "exit" })} />
          <ProgressBarAnimated
            width={SCREEN_WIDTH - 150}
            value={state.progress}
            backgroundColorOnComplete="black"
            backgroundColor="rgba(68, 228, 33, 0.97)"
            underlyingColor="rgba(44, 128, 255, 0.72)"
          />
          <LivesIndicator nLives={state.lives} />
        </View>

        <Text
          style={{
            flex: 1,
            fontSize: 40,
            fontFamily: "Rubik_300Light",
            margin: 10
          }}
        >
          {infinitive}
        </Text>
        <View style={{
              flex: 1,
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
          <Text
            style={{fontSize: 30, marginHorizontal: 5,
              fontFamily: "Rubik_300Light"}}
          >
            {state.verbData[state.activeVerb.nActiveVerb].tense}
          </Text>
          <AntDesign name="clockcircleo" size={20} color="black" />
        </View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: answerContainerX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
                  }),
                },
              ],
              flex: 2,
            },
          ]}
        >
        <SentenceWithVerb
            style={{ flex: 1 }}
            possession={
              state.verbData[state.activeVerb.nActiveVerb].possessionInfo
                .possession
            }
            
            verb={state.activeVerb.conjugation}
            answered={state.questionStatus}
            morphology={
              state.verbData[state.activeVerb.nActiveVerb].possessionInfo
                .morphology
            }
            tense_en={tense_en}
            pattern={pattern}
            noun_phrase={noun_phrase}
            gameStyle={"Writing"}
            handleTextInput = {handleTextInput}
            inputValue = {state.inputValue}
            inputEnabled = {state.inputEnabled}
          />
</Animated.View>
            <View style={{flex: 1}}>
              <SmallYellowButton name="Need Help" onClick={giveUp} disabled={!state.inputEnabled} />
            </View>

      </SafeAreaView>
      <_3DButton
        width={SCREEN_WIDTH - 170}
        height={SCREEN_HEIGHT / 20}
        textFontFamily={"Rubik_300Light"}
        fontSize={SCREEN_HEIGHT / 35}
        textColor={"black"}
        backgroundColor={
          state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"
        }
        borderWidth={1}
        borderRadius={10}
        borderColor={state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"}
        backgroundDarker={
          state.continueEnabled ? "rgba(54, 191, 24, 0.97)" : "#8F8C8C"
        }
        name={"Continue"}
        onPress={
          slideInLeft
        }
        enabled={state.continueEnabled}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          width: SCREEN_WIDTH,
          paddingBottom: SCREEN_HEIGHT / 20,
        }}
      >
        {state.questionStatus == "unanswered" ? null : (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: SCREEN_HEIGHT/5,
              left: 0,
              width: SCREEN_WIDTH,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              backgroundColor:
                state.questionStatus == "correct" ? "#89F678" : "#FF8080",
            }}
          >
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontFamily: "Nunito_300Light", fontSize: 24 }}>
                {state.questionStatus == "correct"
                  ? "Great job! Keep going!"
                  : "Oops! Thats not right. Try again."}
              </Text>
            </View>
          </View>
        )}
      </_3DButton>
    </View>

         


     );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 2,
      backgroundColor: "white",
    },
    row: {
      flex: 2,
      flexDirection: 'row',
      width: SCREEN_WIDTH
    },
    text: {
      marginHorizontal: 24,
      fontFamily: 'Rubik_300Light',
      fontSize: normalize(20)
  }
  });
 
export default Writing;