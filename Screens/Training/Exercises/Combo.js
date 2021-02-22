import React, { useState, useReducer, useEffect } from "react";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import getGameplayWords from "../../../Actions/GetMethods/GetGameplayWords";
import { normalize } from "../../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../Actions/ScreenDimensions";
import XButton from "../../../Components/Buttons/XButton";
import LivesIndicator from "../../../Components/LivesIndicator";
import DragDropQuestion from "./ComboComponents/DragDropQuestion";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import springAnimation from "../../../Actions/Animations/springAnimation";
import WritingQuestion from "./ComboComponents/WritingQuestion";
import MatchingQuestion from "./ComboComponents/MatchingQuestion";
import WelcomeModal from "../../../Components/Modals/WelcomeModal";
import ExitModal from "../../../Components/Modals/ExitModal";
import LostLivesModal from "../../../Components/Modals/LostLivesModal";
import CompletedExerciseModal from "../../../Components/Modals/CompletedExerciseModal";

const createComboTrainingDataset = ({ family }) => {
  //let typeCounter = 1;
  let typeCounter;
  const ctds = family.map((inflectionObj, index) => {
    typeCounter = Math.floor(Math.random() * 3);
    let question = {
      type: typeCounter,
      qComponent: getQComponent(typeCounter),
    };
    /* typeCounter++; */
    return question;
  });
  return ctds;
};

const getQComponent = (type) => {
  //maybe here i can create disposable react components each with their own state
  if (type == 0) {
    //this will be a multiple choice question so it will need all the unique MC question properties
    // like choices and solution
    return DragDropQuestion;
  } else if (type == 1) {
    return WritingQuestion;
  } else if (type == 2) {
    return MatchingQuestion;
  }
};

const getInitialState = ({ family }) => {
  const verbFamily = getGameplayWords(JSON.parse(JSON.stringify(family)));
  let trainingSet = createComboTrainingDataset({
    family: verbFamily,
  });

  return {
    verbFamily,
    allQComponents: trainingSet,
    progress: 0,
    lives: 3,
    slideValue: 0,
    progressIncrementer: 100 / verbFamily.length,
    modalVisibility: {
      exit: false,
      grade: false,
      failed: false,
      passed: false,
      instructions: true,
    },
  };
};

const comboReducer = (prevState, action) => {
  if (action.type == "updateProgress") {
    return action.payload
      ? {
          ...prevState,
          progress: prevState.progress + prevState.progressIncrementer,
        }
      : prevState.lives - 1 == 0
      ? {
          ...prevState,
          lives: prevState.lives - 1,
          modalVisibility: { ...prevState.modalVisibility, failed: true },
        }
      : {
          ...prevState,
          verbFamily: prevState.verbFamily.concat(
            prevState.verbFamily[prevState.slideValue]
          ),
          allQComponents: prevState.allQComponents.concat(
            prevState.allQComponents[prevState.slideValue]
          ),
          lives: prevState.lives - 1,
        };
  } else if (action.type == "nextSlide") {
    return prevState.slideValue == prevState.verbFamily.length - 1
      ? {
          ...prevState,
          modalVisibility: { ...prevState.modalVisibility, passed: true },
        }
      : { ...prevState, slideValue: prevState.slideValue + 1 };
  }else if (action.type == "exit") {
    return {
      ...prevState,
      modalVisibility: { ...prevState.modalVisibility, exit: true },
    };
  } else if (action.type == "closeModal") {
    return {
      ...prevState,
      modalVisibility: {
        exit: false,
        grade: false,
        failed: false,
        passed: false,
        instructions: false,
      },
    };
  }
};

const Combo = ({ route, navigation }) => {
  const { family, infinitive, tense_en, pattern, noun_phrase, translation } = route.params;

  const [state, dispatch] = useReducer(
    comboReducer,
    getInitialState({ family })
  );

  const horizontalContainer = useState(new Animated.Value(0))[0];

  const sendResult = (payload) => {
    dispatch({ type: "updateProgress", payload });
  };

  const slideToNextQ = () => {
    springAnimation(horizontalContainer, 500, state.slideValue + 1).start();
    dispatch({ type: "nextSlide" });
  };

  const closeModal = () => {
    dispatch({ type: "closeModal" });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <WelcomeModal
        goFn={closeModal}
        visibility={state.modalVisibility.instructions}
      />
      <ExitModal
        goFn={closeModal}
        visibility={state.modalVisibility.exit}
        navigation={navigation}
      />
      <LostLivesModal
        goFn={closeModal}
        visibility={state.modalVisibility.failed}
        navigation={navigation}
      />
      <CompletedExerciseModal
        goFn={closeModal}
        visibility={state.modalVisibility.passed}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            ...styles.gameHeader,
          }}
        >
          <XButton onPress={() => dispatch({ type: "exit" })} />
          <ProgressBarAnimated
            width={SCREEN_WIDTH - 150}
            value={state.progress}
            backgroundColorOnComplete="rgba(68, 228, 33, 0.97)"
            backgroundColor="#4294DB"
            underlyingColor="rgba(44, 128, 255, 0.72)"
          />
          <LivesIndicator nLives={state.lives} />
        </View>
        <Text
        style={{
          alignSelf: "center",
          fontFamily: "Poppins_300Light",
          fontSize: normalize(16),
        }}>
          {infinitive}
        </Text> 
        <Text
        style={{
          alignSelf: "center",
          fontFamily: "Poppins_300Light",
          fontSize: normalize(10),
        }}>
          ({translation})
        </Text> 
        <Text
          style={{
            alignSelf: "center",
            fontFamily: "Poppins_300Light",
            fontSize: normalize(12),
          }}
        >
          {tense_en.toLowerCase()} tense
        </Text>
      </SafeAreaView>
      <Animated.View
        //horizontal={true}
        style={[
          {
            flexDirection: "row",
            flex: 6,
            transform: [
              {
                translateX: horizontalContainer.interpolate({
                  inputRange: [0, state.allQComponents.length],
                  outputRange: [0, -SCREEN_WIDTH * state.allQComponents.length],
                }),
              },
            ],
          },
        ]}
      >
        {state.allQComponents.map((QComponent, index) => {
          return (
            <QComponent.qComponent
              key={index}
              sendResult={sendResult}
              nextQuestion={slideToNextQ}
              infinitive={infinitive}
              index={index}
              family={state.verbFamily}
              tense_en={tense_en}
              pattern={pattern}
              noun_phrase={noun_phrase}
              isActive={state.slideValue == index}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "white",
  },
  gameHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    paddingHorizontal: 5
  },
  questionInstructions: {
    fontSize: normalize(18),
    fontFamily: "Poppins_300Light",
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

export default Combo;
