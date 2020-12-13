import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View, Animated } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import LivesIndicator from "../../Components/LivesIndicator";
import XButton from "../../Components/Buttons/XButton";
import SentenceWithVerb from "../../Components/SentenceWithVerb";
import MultipleChoices from "../../Containers/MultipleChoices";
import HebrootsModal from "../../Components/HebrootsModal";
import getGameplayWords from "../../Actions/GetMethods/GetGameplayWords.js";
import shuffleArray from "../../Actions/ShuffleArray";
import compose from "../../Actions/Compose";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../Actions/ScreenDimensions";
import getNRandomUniqueElements from "../../Actions/GetMethods/GetNRandomUniqueElements";
import multiChoiceReducer from "../../Actions/Reducers/MultiChoiceReducer";
import getAllChoices from "../../Actions/GetMethods/GetAllChoices";
import { navigateToPattern } from "../../Actions/NavigateTo";
import { StackActions } from "@react-navigation/native";
import _3DButton from "../../Components/Buttons/_3DButton";
import Bird from "../../Components/Characters/Bird";
import { AntDesign } from '@expo/vector-icons'; 

function getInitialState(verbFamily) {
  return {
    verbData: verbFamily,
    selectedChoice: null,
    allChoices: get3Choices(verbFamily),
    questionStatus: "unanswered",
    activeVerb: {
      nActiveVerb: 0,
      conjugation: verbFamily[0].conjugation,
    },
    choicesEnabled: true,
    checkEnabled: false,
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
  };
}

function get3Choices(verbFamily) {
  return compose(
    getAllChoices,
    shuffleArray,
    getNRandomUniqueElements
  )({
    caller: "initial",
    usedElements: [verbFamily[0].conjugation],
    data: verbFamily,
    nCardsRequested: 3,
    type: "conjugation",
  });
}

const MultiChoiceTraining = ({ route, navigation }) => {
  const {
    family,
    infinitive,
    gameStyle,
    tense_en,
    pattern,
    noun_phrase,
  } = route.params;

  const [state, dispatch] = useReducer(
    multiChoiceReducer,
    getGameplayWords(family),
    getInitialState
  );

  const selectChoice = (nChoice) => {
    dispatch({ type: "selectChoice", payload: nChoice });
  };

  const disableCheck = () => {
    dispatch({type: "disableCheck"})
  }

  const checkPlease = () => {
    dispatch({ type: "checkPlease" });
  };

  const moveToNextQuestion = () => {
    dispatch({ type: "moveToNextQuestion" });
  };

  const replay = () => {
    dispatch({ type: "replay", payload: initialState });
  };

  const answerContainerX = useState(new Animated.Value(1))[0];

  const slideInLeft = () => {
    disableCheck();
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
                navigation.navigate("UserTrainingMap");
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
                navigateToPattern(navigation, "SelectAPattern", {});
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
                navigateToPattern(navigation, "SelectAPattern", {});
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
            alignItems: "center",
            justifyContent: "space-around",
            width: SCREEN_WIDTH,
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
            margin: 10,
          }}
        >
          {infinitive}
        </Text>
        <View style={{
              flex: 1,
              flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'
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
              flex: 9,
            },
          ]}
        >
          <SentenceWithVerb
            gameStyle={"MultiChoiceQuiz"}
            style={{ flex: 4 }}
            possession={
              state.verbData[state.activeVerb.nActiveVerb].possessionInfo
                .possession
            }
            tense={state.verbData[state.activeVerb.nActiveVerb].tense}
            verb={state.activeVerb.conjugation}
            answered={state.questionStatus}
            morphology={
              state.verbData[state.activeVerb.nActiveVerb].possessionInfo
                .morphology
            }
            tense_en={tense_en}
            pattern={pattern}
            noun_phrase={noun_phrase}
          />

          <MultipleChoices
            style={{ flex: 5 }}
            choices={state.allChoices}
            selected={state.selectedChoice}
            setSelected={selectChoice}
            enabled={state.choicesEnabled}
          />
        </Animated.View>
      </SafeAreaView>
      <_3DButton
        width={SCREEN_WIDTH - 170}
        height={SCREEN_HEIGHT / 20}
        textFontFamily={"Rubik_300Light"}
        fontSize={SCREEN_HEIGHT / 35}
        textColor={"black"}
        backgroundColor={
          state.checkEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"
        }
        borderWidth={1}
        borderRadius={10}
        borderColor={state.checkEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"}
        backgroundDarker={
          state.checkEnabled ? "rgba(54, 191, 24, 0.97)" : "#8F8C8C"
        }
        name={state.questionStatus == "unanswered" ? "Check" : "Continue"}
        onPress={
          state.questionStatus == "unanswered" ? checkPlease : slideInLeft
        }
        enabled={state.checkEnabled}
        style={{
          flex: 2,
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 8,
    backgroundColor: "white",
  },
});

export default MultiChoiceTraining;
