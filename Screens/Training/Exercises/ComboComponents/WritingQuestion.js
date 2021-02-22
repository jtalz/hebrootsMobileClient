import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import timedAnimation from "../../../../Actions/Animations/timedAnimation";
import isCorrectConsonants from "../../../../Actions/CheckAnswer";
import { normalize } from "../../../../Actions/Normalize";
import WritingQReducer from "../../../../Actions/Reducers/WritingQReducer";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../../Actions/ScreenDimensions";
import SmallYellowButton from "../../../../Components/Buttons/SmallYellowButton";
import _3DButton from "../../../../Components/Buttons/_3DButton";
import CorrectAnswerModal from "../../../../Components/Modals/CorrectAnswerModal";
import IncorrectAnswerModal from "../../../../Components/Modals/IncorrectAnswerModal";
import SentenceWithVerb from "../../../../Components/SentenceWithVerb";

const WritingQuestion = React.memo(({
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

  const solutionContainerY = useState(new Animated.Value(0))[0];

  const animateSolutionContainerIn = () => {
    timedAnimation(solutionContainerY, 300, 1).start();
  };
  //handle text input (change/attempt at answer)
  //payload = text input value
  const handleTextInput = (text) => {
    dispatch({ type: "handleTextInput", payload: text });
    if (isCorrectConsonants(text, state.verb)) {
      sendResult(true);
      animateSolutionContainerIn();
    }
  };

  const giveUp = () => {
    dispatch({ type: "giveUp" });
    animateSolutionContainerIn();
    sendResult(false);
  };

  return (
    <View>
        <CorrectAnswerModal onClick={()=>{nextQuestion();dispatch({type: 'next'})}} visibility={state.questionStatus == "correct"} />
        <IncorrectAnswerModal onClick={()=>{nextQuestion();dispatch({type: 'next'})}} answer={state.verb} visibility={state.questionStatus == "gaveUp"} />      
      
      <Text style={{ ...styles.instructions }}>
        Type the appropriately conjugated verb
      </Text>
      {/* <Text style={{...styles.infinitive}}>
                {infinitive}
            </Text> */}
      <SentenceWithVerb
        style={{}}
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
      <View style={{ alignSelf: "center" }}>
        <SmallYellowButton
          name="Need Help"
          onClick={giveUp}
          disabled={!state.inputEnabled}
          backgroundColor='#4294DB'
        />
      </View>
      {/* <_3DButton
        width={SCREEN_WIDTH - 170}
        height={SCREEN_HEIGHT / 20}
        textFontFamily={"Poppins_300Light"}
        fontSize={SCREEN_HEIGHT / 35}
        textColor={"black"}
        backgroundColor={
          state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"
        }
        borderWidth={1}
        borderRadius={10}
        borderColor={
          state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"
        }
        backgroundDarker={
          state.continueEnabled ? "rgba(54, 191, 24, 0.97)" : "#8F8C8C"
        }
        name={"Continue"}
        onPress={nextQuestion}
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
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              height: SCREEN_HEIGHT / 5,
              left: 0,
              width: SCREEN_WIDTH,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              backgroundColor:
                state.questionStatus == "correct" ? "#89F678" : "#FF8080",
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
            <View
              style={{ marginLeft: 10, marginTop: 10, paddingHorizontal: 10 }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: normalize(16),
                }}
              >
                {state.questionStatus == "correct"
                  ? "Great job! Keep going!"
                  : `Oops! The correct answer was ${state.verb}. Please try again.`}
              </Text>
            </View>
          </Animated.View>
        )}
      </_3DButton> */}
    </View>
  );
})

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 24,
    fontFamily: "Poppins_300Light",
    fontSize: normalize(20),
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  instructions: {
    fontFamily: "Poppins_300Light",
    fontSize: normalize(16),
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignSelf: "center",
  },
  infinitive: {
    fontFamily: "Poppins_300Light",
    fontSize: normalize(20),
    paddingVertical: 10,
    alignSelf: "center",
  },
});

export default WritingQuestion;