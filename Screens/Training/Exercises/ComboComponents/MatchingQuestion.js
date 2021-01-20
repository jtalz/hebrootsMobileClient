import React, {useReducer} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import compose from '../../../../Actions/Compose';
import getNRandomUniqueElements from '../../../../Actions/GetMethods/GetNRandomUniqueElements';
import { normalize } from '../../../../Actions/Normalize';
import { matchingReducer } from '../../../../Actions/Reducers/MatchingReducer';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../Actions/ScreenDimensions';
import seperateInflectionsFromPronouns from '../../../../Actions/SeperateInflectionsFromPronouns';
import shuffleArray from '../../../../Actions/ShuffleArray';
import _3DButton from '../../../../Components/Buttons/_3DButton';
import MatchingCard from '../../../../Components/MatchingCard';

const getDeck = (deck) => deck;

const getFreshDeck = (data) => {
    // returns array nTotalDesired of { _id: Number, name: String (conjugation), pair: Number, visible: Boolean, selected: Boolean }
    return compose(
      getDeck,
      shuffleArray,
      seperateInflectionsFromPronouns,
      getNRandomUniqueElements
    )({
      usedElements: [],
      data,
      nCardsRequested: 6,
      type: "regular",
    });
  };

const MatchingQuestion = ({index, family, tense_en, pattern, noun_phrase, infinitive, sendResult, nextQuestion}) => {
    
    const [state, dispatch] = useReducer(matchingReducer, {
        deck: getFreshDeck(family),
        continueEnabled: false
    })
    
    const selectCard = (card) => {
        dispatch({ type: "selectCard", payload: card })
    }

    return ( 

        <View style={{alignItems: 'center'}}>
            <Text style={{...styles.instructions}}>
                Match each pronoun with the appropriate conjugation
            </Text>
            <FlatList
                data={state.deck}
                numColumns={2}
                keyExtractor={(item) => item.name}
                renderItem={
                    ({item}) =>  (
                        <MatchingCard 
                            item={item}
                            selectCard = {selectCard}
                        />
                    )
                }
            />
            <_3DButton
                width={SCREEN_WIDTH - 170}
                height={SCREEN_HEIGHT / 20}
                textFontFamily={"Rubik_300Light"}
                fontSize={SCREEN_HEIGHT / 35}
                textColor={"black"}
                backgroundColor={
                  state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"
                }
                borderWidth={1}
                borderRadius={10}
                borderColor={state.continueEnabled ? "rgba(68, 228, 33, 0.97)" : "#8F8C8C"}
                backgroundDarker={
                  state.continueEnabled ? "rgba(54, 191, 24, 0.97)" : "#8F8C8C"
                }
                name={"Continue"}
                onPress={
                  nextQuestion
                }
                enabled={state.continueEnabled}
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: SCREEN_WIDTH,
                  paddingBottom: SCREEN_HEIGHT / 20,
                }}
            />
        </View>

     );
}

const styles = StyleSheet.create({
    instructions: {
        fontFamily: 'Nunito_400Regular',
        fontSize: normalize(16),
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignSelf: 'center'
    }
  });
 
export default MatchingQuestion;