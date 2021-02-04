import React,{ useReducer, useState } from "react"
import { View, Animated, StyleSheet, Text, SafeAreaView } from "react-native"
import timedAnimation from "../../../../Actions/Animations/timedAnimation"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../Actions/ScreenDimensions"
import _3DButton from "../../../../Components/Buttons/_3DButton"
import MultipleChoices from "../../../../Containers/MultipleChoices"
import compose from '../../../../Actions/Compose'
import  getAllChoices from '../../../../Actions/GetMethods/GetAllChoices'
import shuffleArray from '../../../../Actions/ShuffleArray'
import getNRandomUniqueElements from '../../../../Actions/GetMethods/GetNRandomUniqueElements'
import { normalize } from "../../../../Actions/Normalize"

const reducer = (state, {type, payload}) => {
    if (type == 'selectChoice'){
        return { ...state, selectedChoice : payload, checkEnabled: true }
    }else if (type == 'checkPlease'){
        return state.allChoices[state.selectedChoice] == state.verb ? 
                    {...state, questionStatus : 'correct', choicesEnabled : false } : 
                    {...state, questionStatus : 'incorrect', choicesEnabled : false } 
    }else if (type == 'disableCheck'){
        return {...state, checkEnabled: false}
    }
}
const DragDropQuestion  = ({index, family, tense_en, pattern, noun_phrase, infinitive, sendResult, nextQuestion}) => {
        
    const [state, dispatch] = useReducer( reducer, {
        selectedChoice: null, 
        allChoices: get3Choices(family, family[index].conjugation),
        questionStatus: "unanswered",
        choicesEnabled: true,
        checkEnabled: false,
        verb: family[index].conjugation
    })

    const solutionContainerY = useState(new Animated.Value(0))[0];

    const selectChoice = (nChoice) => {
        nChoice == null
          ? dispatch({ type: "disableCheck" })
          : dispatch({ type: "selectChoice", payload: nChoice });
      };

      const checkPlease = () => {
        dispatch({ type: "checkPlease" });
        animateSolutionContainerIn();
        sendResult(state.allChoices[state.selectedChoice] == state.verb)
      };

      const animateSolutionContainerIn = () => {
        timedAnimation(solutionContainerY, 300, 1).start();
      };
    return (
        
        <View style={{width: SCREEN_WIDTH}}>
            <Text style={{...styles.instructions}}>
                Drag the appropriately conjugated verb to its place
            </Text>
            <MultipleChoices
                choices={state.allChoices}
                selected={state.selectedChoice}
                setSelected={selectChoice}
                enabled={state.choicesEnabled}
                possession={
                family[index].possessionInfo
                    .possession
                }
                tense={family[index].tense}
                verb={state.verb}
                answered={state.questionStatus}
                morphology={
                    family[index].possessionInfo
                    .morphology
                }
                tense_en={tense_en}
                pattern={pattern}
                noun_phrase={noun_phrase}
                pronoun_en={
                    family[index].possessionInfo
                    .possession_en
                }
                gameStyle={"MultiChoiceQuiz"}
            />
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
                state.questionStatus == "unanswered" ? checkPlease : nextQuestion
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
                <View style={{ marginLeft: 10, marginTop: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontFamily: "Nunito_300Light", fontSize: normalize(16) }}>
                    {state.questionStatus == "correct"
                        ? "Great job! Keep going!"
                        : `Oops! The correct answer was ${state.verb}. Please try again.`}
                    </Text>
                </View>
                </Animated.View>
            </_3DButton>
        </View>
        
    )

}

const styles = StyleSheet.create({
    solutionContainer: {
        position: "absolute",
        bottom: 0,
        height: SCREEN_HEIGHT / 5,
        left: 0,
        width: SCREEN_WIDTH,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        
      },
      container: {
        justifyContent: "space-between",
        alignItems: "center",
        flex: 8,
        backgroundColor: "white",
      },
      instructions: {
        fontFamily: 'Nunito_400Regular',
        fontSize: normalize (16),
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignSelf: 'center'
    },
})

function get3Choices(verbFamily, usedElement) {
    return compose(
      getAllChoices ,
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