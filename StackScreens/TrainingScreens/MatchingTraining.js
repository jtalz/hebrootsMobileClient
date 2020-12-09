import React, { useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
} from "react-native";
import XButton from "../../Components/Buttons/XButton";
import getVerbFamilyStyle from "../../Actions/GetMethods/GetGameplayWords.js";
import shuffleArray from "../../Actions/ShuffleArray";
import compose from "../../Actions/Compose";
import {
  SCREEN_WIDTH
} from "../../Actions/GetMethods/ScreenDimensions";
import getNRandomUniqueElements from "../../Actions/GetMethods/GetNRandomUniqueElements";
import getSeperatedConjugationsAndPossessions from "../../Actions/GetMethods/GetSeperatedConjugationsAndPossessions";
import { matchingReducer } from "../../Actions/Reducers/MatchingReducer";
import HebrootsModal from "../../Components/HebrootsModal";

import { StackActions } from "@react-navigation/native";
import MatchingCard from '../../Components/MatchingCard'
import { Stopwatch } from "react-native-stopwatch-timer";
import StopwatchTimer from "../../Components/StopwatchTimer"

const getDeck = (deck) => deck;

const getTime = (time) => time

const getFreshDeck = (data) => {
  // returns array nTotalDesired of { _id: Number, name: String (conjugation), pair: Number, visible: Boolean, selected: Boolean }
  return compose(
    getDeck,
    shuffleArray,
    getSeperatedConjugationsAndPossessions,
    getNRandomUniqueElements
  )({
    usedElements: [],
    data,
    nCardsRequested: 6,
    type: "regular",
  });
};

const getInitialState = (data) => {
  return {
    deck: getFreshDeck(data),
    modalVisibility: { exit: false, passed: false, instructions: true },
    timer: { start: false, reset: false },
  };
};

const MatchingTraining = ({ route, navigation }) => {
  const { family, infinitive, gameStyle } = route.params;
  const [state, dispatch] = useReducer(
    matchingReducer,
    getVerbFamilyStyle(gameStyle, family),
    getInitialState
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <HebrootsModal
        message="Welcome to Matching. Try your best to match each pronoun (like אני, אתה, הוא) with their corresponding conjugation. Good luck!"
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
        message={`Great job! You completed the task. Return to the pattern screen to learn another one.`}
        buttons={[
          {
            name: "Learn something else",
            callback: () => {
              dispatch({ type: "close" });
              navigation.dispatch(StackActions.popToTop());
              /* navigateToPattern(navigation, 'SelectAPattern', {}); */
              navigation.goBack();
            },
          },
        ]}
        visibility={state.modalVisibility.passed}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 15,
        }}
      >
        <XButton
          onPress={() => {
            dispatch({ type: "exit" });
          }}
        />

        <StopwatchTimer 
            start={state.timer.start}
            reset={state.timer.reset}
            dispatch={dispatch}
            getTime={getTime}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: SCREEN_WIDTH,
        }}
      >
        <FlatList
          data={state.deck}
          numColumns={3}
          keyExtractor={(item) => item.name}
          renderItem={({item}) =>  (
            <MatchingCard 
                item={item}
                dispatch={dispatch} 
                />)
            }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});

export default MatchingTraining;
