import React, { useState, useReducer, useEffect } from "react";
import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import timedAnimation from "../../../Actions/Animations/timedAnimation";
import getGameplayWords from "../../../Actions/GetMethods/GetGameplayWords";
import { normalize } from "../../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../Actions/ScreenDimensions";
import XButton from "../../../Components/Buttons/XButton";
import LivesIndicator from "../../../Components/LivesIndicator";
import DragDropQuestion from "./ComboComponents/DragDropQuestion";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import springAnimation from '../../../Actions/Animations/springAnimation'
import WritingQuestion from "./ComboComponents/WritingQuestion";
import MatchingQuestion from "./ComboComponents/MatchingQuestion";
import HebrootsModal from "../../../Components/HebrootsModal";
/* 

Goal of this exercise: 
- take a combination of 2 verbs all in one pattern one tense
- make a duolingo-like exercise using a combination of multiple choice, fill in the blank, writing, and matching games
- how do we do it?

10 questions total
each verb gets 5 questions - 2 writing 2 multi-choice 1 matching

*/

const createComboTrainingDataset = ({
  family,
}) => {
  //let typeCounter = 1;
  let typeCounter;
  const ctds = family.map((inflectionObj, index) => {
    typeCounter = Math.floor(Math.random() * 3)
    let question = {
        type: typeCounter,
        qComponent: getQComponent(typeCounter),
    };
    /* typeCounter++; */
    return question;
  });
  return ctds;
};

const getQComponent = (
  type
) => {
  //maybe here i can create disposable react components each with their own state
  if (type == 0) {
    //this will be a multiple choice question so it will need all the unique MC question properties
    // like choices and solution
    return DragDropQuestion
  }else if (type == 1) {
    return WritingQuestion
  }else if (type == 2) { 
    return MatchingQuestion
  }
};

const getInitialState = ({ family, infinitive, tense_en, pattern, noun_phrase }) => {
    const verbFamily = getGameplayWords(family);
    let trainingSet = createComboTrainingDataset({
        family: verbFamily,
    });

    return {
      verbFamily,
      allQComponents: trainingSet,
      progress: 0,
      lives: 5,
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
  }

const comboReducer = (prevState, action) => {
    if (action.type == 'updateProgress'){
        return action.payload ?  
            {...prevState, progress : prevState.progress+ prevState.progressIncrementer} :
            prevState.lives - 1 == 0 ? 
            {...prevState, lives : prevState.lives-1, modalVisibility:{...prevState.modalVisibility, failed: true} } :
            {...prevState, verbFamily: prevState.verbFamily.concat(prevState.verbFamily[prevState.slideValue]), allQComponents: prevState.allQComponents.concat(prevState.allQComponents[prevState.slideValue]), lives : prevState.lives-1}                 
    }else if(action.type == 'nextSlide'){
      return {...prevState, slideValue: prevState.slideValue+1 }
    }else if(action.type == 'closeInstructions'){
      return {...prevState, modalVisibility: {...prevState.modalVisibility, instructions: false}}
    }
}

const Combo = ({ route, navigation }) => {
    
    const { family, infinitive, tense_en, pattern, noun_phrase } = route.params;

    const [state, dispatch] = useReducer(comboReducer, getInitialState({ family, infinitive, tense_en, pattern, noun_phrase }))

      const sendResult = (payload) => {
          dispatch({type: 'updateProgress', payload})

      }

      const horizontalContainer = useState(new Animated.Value(0))[0];

      useEffect(()=>{
        console.log('LOGGING ALL Q COMPONENTS NOW',state.allQComponents.length)
        console.log('LOGGING VERB FAMIL', state.verbFamily.length)
        console.log('SLIde value: ', state.slideValue)
      },[state.slideValue])

      const slideToNextQ = () => {
        
          springAnimation(horizontalContainer, 500, state.slideValue+1).start()
          dispatch({type: 'nextSlide'})
    }

    return ( 
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <HebrootsModal
        message="
        Welcome to verb training. Answer the following questions to the best of your ability. You have 5 lives.
        "
        buttons={[
          {
            name: "Let's go!",
            callback: () => {
              dispatch({ type: "closeInstructions" });
            },
          },
        ]}
        visibility={state.modalVisibility.instructions}
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
            backgroundColorOnComplete="black"
            backgroundColor="rgba(68, 228, 33, 0.97)"
            underlyingColor="rgba(44, 128, 255, 0.72)"
          />
          <LivesIndicator nLives={state.lives} />
        </View>
        <Text style={{alignSelf: 'center', fontFamily: 'Rubik_400Regular', fontSize: normalize(12)}}>{tense_en} TENSE</Text>
        </SafeAreaView>
            <Animated.View
            //horizontal={true}
            style={[{
              
              flexDirection: 'row',
              flex: 9,
              transform: [
                {
                  translateX: horizontalContainer.interpolate({
                    inputRange: [0, state.allQComponents.length],
                    outputRange: [0, -SCREEN_WIDTH*state.allQComponents.length],
                  }),
                },
              ],
              
            }]}
            >
                {
                    state.allQComponents.map((QComponent, index) => {
                        /* return <View></View> */
                        /* console.log('qcomponent: ', QComponent.qComponent()) */
                        return (
                            <QComponent.qComponent 
                                key={index}
                                sendResult={sendResult} 
                                nextQuestion = {slideToNextQ}
                                infinitive={infinitive}
                                index={index}  
                                family={state.verbFamily} 
                                tense_en={tense_en} 
                                pattern={pattern} 
                                noun_phrase={noun_phrase}
                                isActive={state.slideValue == index}
                                />
                        )
                    })
                }
            </Animated.View>
        
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
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
})
 
export default Combo;