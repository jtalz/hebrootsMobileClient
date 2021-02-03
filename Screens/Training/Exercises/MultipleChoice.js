import React, { useReducer, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View, Animated } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import LivesIndicator from "../../../Components/LivesIndicator";
import XButton from "../../../Components/Buttons/XButton";
import MultipleChoices from "../../../Containers/MultipleChoices";
import HebrootsModal from "../../../Components/Modals/HebrootsModal";
import getGameplayWords from "../../../Actions/GetMethods/GetGameplayWords.js";
import shuffleArray from "../../../Actions/ShuffleArray";
import compose from "../../../Actions/Compose";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../Actions/ScreenDimensions";
import getNRandomUniqueElements from "../../../Actions/GetMethods/GetNRandomUniqueElements";
import multiChoiceReducer from "../../../Actions/Reducers/MultiChoiceReducer";
import getAllChoices from "../../../Actions/GetMethods/GetAllChoices";
import { navigateToPattern } from "../../../Actions/NavigateTo";
import { StackActions } from "@react-navigation/native";
import _3DButton from "../../../Components/Buttons/_3DButton";
import { normalize } from "../../../Actions/Normalize";
import timedAnimation from "../../../Actions/Animations/timedAnimation";
import springAnimation from "../../../Actions/Animations/springAnimation";

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

const MultipleChoice = ({ route, navigation }) => {
  const { family, infinitive, tense_en, pattern, noun_phrase } = route.params;

  const [state, dispatch] = useReducer(
    multiChoiceReducer,
    getGameplayWords(family),
    getInitialState
  );

  const selectChoice = (nChoice) => {
    nChoice == null
      ? dispatch({ type: "disableCheck" })
      : dispatch({ type: "selectChoice", payload: nChoice });
  };

  const disableCheck = () => {
    dispatch({ type: "disableCheck" });
  };

  const checkPlease = () => {
    dispatch({ type: "checkPlease" });
    animateSolutionContainerIn();
  };

  const replay = () => {
    dispatch({ type: "replay", payload: initialState });
  };

  const answerContainerX = useState(new Animated.Value(1))[0];

  const solutionContainerY = useState(new Animated.Value(0))[0];

  const animateSolutionContainerIn = () => {
    timedAnimation(solutionContainerY, 300, 1).start();
  };

  const animateSolutionContainerOut = () => {
    timedAnimation(solutionContainerY, 100, 0).start(() => {
      dispatch({ type: "moveToNextQuestion" });
    });
  };

  const slideInLeft = () => {
    disableCheck();
    animateSolutionContainerOut();
    Animated.sequence([
      timedAnimation(answerContainerX, 300, 2),
      timedAnimation(answerContainerX, 0, 0),
    ]).start(() => {
      springAnimation(answerContainerX, 500, 1).start();
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
            ...styles.gameHeader,
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
        <View style={{ flex: 2 }}>
          <Text
            style={{
              ...styles.questionInstructions,
            }}
          >
            Fill in the blank
          </Text>
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
              width: SCREEN_WIDTH,
            },
          ]}
        >
          <MultipleChoices
            choices={state.allChoices}
            selected={state.selectedChoice}
            setSelected={selectChoice}
            enabled={state.choicesEnabled}
            gameStyle={"MultiChoiceQuiz"}
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
            pronoun_en={
              state.verbData[state.activeVerb.nActiveVerb].possessionInfo
                .possession_en
            }
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
        <Animated.View
          style={{
            ...styles.solutionContainer,
            backgroundColor: state.questionStatus == "correct" ? "#89F678" : "#FF8080",
            transform: [
              {
                translateY: solutionContainerY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [SCREEN_HEIGHT / 5, 0],
                }),
              },
            ],
          }}
        >
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontFamily: "Nunito_300Light", fontSize: 24 }}>
              {state.questionStatus == "correct"
                ? "Great job! Keep going!"
                : "Oops! Thats not right. Try again."}
            </Text>
          </View>
        </Animated.View>
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
  gameHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
  },
  questionInstructions: {
    fontSize: normalize(18),
    fontFamily: "Rubik_400Regular",
    margin: 10,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    textAlign: "left",
    padding: 20,
  },
  solutionContainer: {
    position: "absolute",
    bottom: 0,
    height: SCREEN_HEIGHT / 5,
    left: 0,
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    
  },
});

export default MultipleChoice;
