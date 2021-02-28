import React, { useReducer, useState } from "react";
import { View, Animated, StyleSheet, Text, SafeAreaView } from "react-native";
import timedAnimation from "../../../../Actions/Animations/timedAnimation";
import { SCREEN_WIDTH } from "../../../../Actions/ScreenDimensions";
import _3DButton from "../../../../Components/Buttons/_3DButton";
import MultipleChoices from "../../../../Containers/MultipleChoices";
import compose from "../../../../Actions/Compose";
import getAllChoices from "../../../../Actions/GetMethods/GetAllChoices";
import shuffleArray from "../../../../Actions/ShuffleArray";
import getNRandomUniqueElements from "../../../../Actions/GetMethods/GetNRandomUniqueElements";
import DragDropQReducer from "../../../../Actions/Reducers/DragDropQReducer";
import SmallYellowButton from "../../../../Components/Buttons/SmallYellowButton";
import CorrectAnswerModal from "../../../../Components/Modals/CorrectAnswerModal";
import IncorrectAnswerModal from "../../../../Components/Modals/IncorrectAnswerModal";
import { Colors, Typography } from "../../../../styles";

const DragDropQuestion = React.memo(
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
    const [state, dispatch] = useReducer(DragDropQReducer, {
      selectedChoice: null,
      allChoices: get3Choices(family, family[index].conjugation),
      questionStatus: "unanswered",
      choicesEnabled: true,
      checkEnabled: false,
      verb: family[index].conjugation,
    });

    const selectChoice = (nChoice) => {
      nChoice == null
        ? dispatch({ type: "disableCheck" })
        : dispatch({ type: "selectChoice", payload: nChoice });
    };

    const checkPlease = () => {
      dispatch({ type: "checkPlease" });
      sendResult(state.allChoices[state.selectedChoice] == state.verb);
    };

    const next = () => {
      nextQuestion();
      dispatch({ type: "next" });
    };
    
    return (
      <View style={styles.container}>
        <CorrectAnswerModal
          onClick={next}
          visibility={state.questionStatus == "correct"}
        />
        <IncorrectAnswerModal
          onClick={next}
          answer={state.verb}
          visibility={state.questionStatus == "incorrect"}
        />
        <Text style={styles.instructions}>
          Drag the appropriately conjugated verb to its place
        </Text>
        <MultipleChoices
          choices={state.allChoices}
          setSelected={selectChoice}
          enabled={state.choicesEnabled}
          possession={family[index].possessionInfo.possession}
          tense={family[index].tense}
          verb={state.verb}
          answered={state.questionStatus}
          morphology={family[index].possessionInfo.morphology}
          tense_en={tense_en}
          pattern={pattern}
          noun_phrase={noun_phrase}
          pronoun_en={family[index].possessionInfo.possession_en}
          gameStyle={"MultiChoiceQuiz"}
        />
        <View style={styles.bottom}>
          <SmallYellowButton
            name="Check"
            onClick={checkPlease}
            disabled={!state.checkEnabled}
            backgroundColor={Colors.skyBlue}
            size={{ width: SCREEN_WIDTH / 2 }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  instructions: {
    ...Typography.light,
    ...Typography.size16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: "center",
  },
  bottom: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
});

function get3Choices(verbFamily, usedElement) {
  return compose(
    getAllChoices,
    shuffleArray,
    getNRandomUniqueElements
  )({
    caller: "initial",
    usedElements: [usedElement],
    data: verbFamily,
    nCardsRequested: 3,
    type: "conjugation",
  });
}

export default DragDropQuestion;
