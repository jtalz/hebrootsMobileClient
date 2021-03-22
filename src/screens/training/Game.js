import React, { useState, useReducer } from "react";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LivesIndicator, XButton } from "../../components/atoms";
import { CompletedExerciseModal, ExitModal, LostLivesModal, WelcomeModal } from "../../components/molecules";
import { springAnimation, trainingReducer } from "../../services";
import DragDropQuestion from "../../services/reducers/training/DragDrop";
import getGameplayWords from "../../services/reducers/training/getGameplayWords";
import MatchingQuestion from "../../services/reducers/training/Matching";
import WritingQuestion from "../../services/reducers/training/Writing";
import { Colors, Typography, Sizing } from "../../styles";
import ProgressBarAnimated from "react-native-progress-bar-animated";

const createComboTrainingDataset = ({ family }) => {
  //let typeCounter = 1;
  let typeCounter;
  const ctds = family.map((inflectionObj, index) => {
    typeCounter = Math.floor(Math.random() * 3);
    let question = {
      type: typeCounter,
      qComponent: getQComponent(typeCounter),
    };
    return question;
  });
  return ctds;
};

const getQComponent = (type) => {
  if (type == 0) {
    return DragDropQuestion;
  } else if (type == 1) {
    return WritingQuestion;
  } else if (type == 2) {
    return MatchingQuestion;
  }
};

const getInitialTrainingState = ({ family }) => {
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

const GameScreen = ({ route, navigation }) => {
  const {
    family,
    infinitive,
    tense_en,
    pattern,
    noun_phrase,
    translation,
  } = route.params;

  const [state, dispatch] = useReducer(
    trainingReducer,
    getInitialTrainingState({ family })
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
    <View style={styles.container}>
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
      <SafeAreaView style={styles.main}>
        <View style={styles.gameHeader}>
          <XButton onPress={() => dispatch({ type: "exit" })} />
          <ProgressBarAnimated
            width={Sizing.SCREEN_WIDTH - 150}
            value={state.progress}
            backgroundColorOnComplete="rgba(68, 228, 33, 0.97)"
            backgroundColor="#4294DB"
            underlyingColor="rgba(44, 128, 255, 0.72)"
          />
          <LivesIndicator nLives={state.lives} />
        </View>
        <Text style={styles.lgText}>{infinitive}</Text>
        <Text style={styles.smText}>({translation})</Text>
        <Text style={styles.smText}>{tense_en.toLowerCase()} tense</Text>
      </SafeAreaView>
      <Animated.View
        //horizontal={true}
        style={[
          {
            flexDirection: "row",
            flex: 4,
            transform: [
              {
                translateX: horizontalContainer.interpolate({
                  inputRange: [0, state.allQComponents.length],
                  outputRange: [0, -Sizing.SCREEN_WIDTH * state.allQComponents.length],
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
    ...Colors.bgWhite,
    flex: 1,
  },
  main: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    ...Colors.bgWhite,
  },
  gameHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: Sizing.SCREEN_WIDTH,
    paddingHorizontal: 5,
  },
  lgText: {
    alignSelf: "center",
    ...Typography.light,
    ...Typography.size18,
  },
  smText: {
    alignSelf: "center",
    ...Typography.light,
    ...Typography.size12,
  },
});

export default GameScreen;
