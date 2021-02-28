import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import timedAnimation from "../../../../Actions/Animations/timedAnimation";
import isCorrectConsonants from "../../../../Actions/CheckAnswer";
import WritingQReducer from "../../../../Actions/Reducers/WritingQReducer";
import SmallYellowButton from "../../../../Components/Buttons/SmallYellowButton";
import CorrectAnswerModal from "../../../../Components/Modals/CorrectAnswerModal";
import IncorrectAnswerModal from "../../../../Components/Modals/IncorrectAnswerModal";
import SentenceWithVerb from "../../../../Components/SentenceWithVerb";
import { Typography } from "../../../../styles";

const WritingQuestion = React.memo(
  ({
    index,
    isActive,
    family,
    tense_en,
    pattern,
    noun_phrase,
    infinitive,
    sendResult,
    nextQuestion,
  }) => {
    const [state, dispatch] = useReducer(WritingQReducer, {
      verb: family[index].conjugation,
      questionStatus: "unanswered",
      inputEnabled: true,
      continueEnabled: false,
      inputValue: "",
    });
    
    const handleTextInput = (text) => {
      dispatch({ type: "handleTextInput", payload: text });
      if (isCorrectConsonants(text, state.verb)) {
        sendResult(true);
      }
    };

    const giveUp = () => {
      dispatch({ type: "giveUp" });
      sendResult(false);
    };

    const next = () => {
      nextQuestion();
      dispatch({ type: "next" });
    };

    return (
      <View>
        <CorrectAnswerModal
          onClick={next}
          visibility={state.questionStatus == "correct"}
        />
        <IncorrectAnswerModal
          onClick={next}
          answer={`${family[index].possessionInfo.possession} ${state.verb}`}
          visibility={state.questionStatus == "gaveUp"}
        />
        <Text style={styles.instructions}>
          Type the appropriately conjugated verb
        </Text>
        <SentenceWithVerb
          possession={family[index].possessionInfo.possession}
          verb={state.verb}
          answered={state.questionStatus}
          morphology={family[index].possessionInfo.morphology}
          tense_en={tense_en}
          pattern={pattern}
          noun_phrase={noun_phrase}
          pronoun_en={family[index].possessionInfo.possession_en}
          gameStyle={"Writing"}
          handleTextInput={handleTextInput}
          inputValue={state.inputValue}
          inputEnabled={state.inputEnabled}
          giveUp={giveUp}
          focusOnInput={index == 0 ? false : isActive}
        />
        <View style={styles.bottom}>
          <SmallYellowButton
            name="Need Help"
            onClick={giveUp}
            disabled={!state.inputEnabled}
            backgroundColor="#4294DB"
          />
        </View>
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
  bottom: {
    alignSelf: "center"
  }
});

export default WritingQuestion;
