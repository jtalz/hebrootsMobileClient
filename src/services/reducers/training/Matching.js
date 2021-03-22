import React, { useReducer, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Typography, Sizing } from "../../../styles";
import { MatchingCard } from "../../../components/atoms";
import { CorrectAnswerModal } from "../../../components/molecules";
import matchingReducer from "../matching";
import { getFreshDeck } from "../../utils";

const MatchingQuestion = React.memo(({ family, sendResult, nextQuestion }) => {
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
      <CorrectAnswerModal onClick={next} visibility={state.continueEnabled} />
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
});

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
    width: Sizing.SCREEN_WIDTH,
  },
});

export default MatchingQuestion;
