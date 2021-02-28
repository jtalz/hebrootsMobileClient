import React, { useReducer, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import getFreshDeck from "../../../../Actions/GetMethods/GetFreshDeck";
import { matchingReducer } from "../../../../Actions/Reducers/MatchingReducer";
import { SCREEN_WIDTH } from "../../../../Actions/ScreenDimensions";
import MatchingCard from "../../../../Components/MatchingCard";
import CorrectAnswerModal from "../../../../Components/Modals/CorrectAnswerModal";
import { Typography } from "../../../../styles";

const MatchingQuestion = React.memo(
  ({
    index,
    family,
    tense_en,
    pattern,
    noun_phrase,
    infinitive,
    sendResult,
    nextQuestion,
  }) => {
    const [state, dispatch] = useReducer(matchingReducer, {
      deck: getFreshDeck(family),
      continueEnabled: false,
    });

    //useeffect to check if game is completed, matching cannot result in an incorrect result
    useEffect(() => {
      if (state.continueEnabled) {
        sendResult(true);
      }
    }, [state.continueEnabled]);

    const selectCard = (card) => {
      dispatch({ type: "selectCard", payload: card });
    };

    const next = () => {
      nextQuestion();
      dispatch({ type: "next" });
    };

    return (
      <View style={styles.container}>
        <CorrectAnswerModal
          onClick={next}
          visibility={state.continueEnabled}
        />
        <Text style={styles.instructions}>
          Match each pronoun with the appropriate conjugation
        </Text>
        <FlatList
          data={state.deck}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <MatchingCard item={item} selectCard={selectCard} />
          )}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  instructions: {
    ...Typography.light,
    ...Typography.size16,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignSelf: "center",
  },
  container: {
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
});

export default MatchingQuestion;
