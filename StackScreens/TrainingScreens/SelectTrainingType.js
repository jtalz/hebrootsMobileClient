import React, {useReducer, useState} from 'react';
import { Image, FlatList, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View, TextInput, Button,  Animated } from 'react-native';
import Bird from '../../Components/Characters/Bird.js'
import RoundCustomButton from '../../Components/Buttons/RoundCustomButton.js'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Actions/GetMethods/ScreenDimensions'
import {normalize} from '../../Actions/Normalize'
import SmallYellowButton from '../../Components/Buttons/SmallYellowButton.js';
import HebrootsModal from "../../Components/HebrootsModal";

const selectTense = (tense, dispatch) => {
  dispatch({type: 'selectTense', payload: tense})
  console.log('tense selected')
}

const selectGame = (game, dispatch) => {
  dispatch({type: 'selectGame', payload: game})
}

const SELECTION_GROUPS = [
  {
    title: "Select a tense",
    onSelect: selectTense,
    options: [
      {
        name: "Past",
        color: "green"
      },
      {
        name: "Present",
        color: "yellow"
      },
      {
        name: "Future",
        color: "blue"
      }
    ]
  },
  {
    title: "Select a game",
    onSelect: selectGame,
    options: [
      {
        name: 'Quiz',
        color: 'red',
      },
      {
        name: 'Matching',
        color: 'blue',
      },
      {
        name: 'Writing',
        color: 'purple',
      }
    ]
  }
]

const initialState = {
  tense: "Past",
  game: "Quiz",
  page: {
    nActivePage: 0,
    activePageTitle: SELECTION_GROUPS[0].title
  },
  selectionGroups: SELECTION_GROUPS,
  readyToStart: false,
  modalVisibility: false,
  allowNextBtn: true,
  allowPrevBtn: false
}

const selectionReducer = (state, action) => {
  if (action.type == "selectTense"){
    return {...state, tense: action.payload}
  }else if (action.type == "selectGame"){
    return {...state, game: action.payload, readyToStart: true}
  }else if (action.type == "nextPage"){
    return {...state, page: { nActivePage: state.page.nActivePage+1, activePageTitle: state.selectionGroups[state.page.nActivePage+1].title}, allowNextBtn: state.page.nActivePage+1 < state.selectionGroups.length - 1, allowPrevBtn:  state.page.nActivePage + 1 > 0}
  }else if (action.type == "lastPage"){
    return {...state, page: { nActivePage: state.page.nActivePage-1, activePageTitle: state.selectionGroups[state.page.nActivePage-1].title }, allowNextBtn: state.page.nActivePage-1 < state.selectionGroups.length - 1, allowPrevBtn:  state.page.nActivePage - 1 > 0}
  }else if (action.type == "pleaseSelectGameAndTense"){
    return {...state, modalVisibility: true}
  }else if (action.type == "close"){
    return {...state, modalVisibility: false}
  }else if (action.type == "disableBtns"){
    return {...state, allowNextBtn: false, allowPrevBtn: false}
  }
}

const SelectTrainingType = ({ route, navigation }) => {
    const {pattern, family, infinitive, noun_phrase} = route.params;
/*     const [verbSet, setVerbSet] = useState([]) */
    const [state, dispatch] = useReducer(selectionReducer, initialState)

    const nextPage = () => {
      dispatch({type: 'nextPage'})
    }

    const lastPage = () => {
      dispatch({type: 'lastPage'})
    }
        const renderItem = ({ item }) => (
            <TouchableOpacity style={{marginVertical: SCREEN_HEIGHT/50}} onPress={() => state.selectionGroups[state.page.nActivePage].onSelect(item.name, dispatch)}>
              <View style={{height: SCREEN_HEIGHT*.1, width: SCREEN_WIDTH, borderColor: '#5ce9ff', backgroundColor: item.color, borderWidth: isSelected(item.name), alignItems: 'center'}}>
                  <Text style={{...styles.rowTitle}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
        );

        const isSelected = (name) => {
          if (name == state.game || name == state.tense){
            return 2
          }else
            return 0
        }


        const navigateToTraining = () => {
            /* 1. Navigate to the Details route with params */
            if(state.tense == "" || state.game == ""){
              dispatch({type: 'pleaseSelectGameAndTense'})
            }else{
            let gameType;
            if (state.game == 'Matching'){
              gameType = "MatchingTraining";
            }else if (state.game == "Quiz"){
              gameType = "MultiChoiceTraining"
            }else{
              gameType = "WritingTraining"
            }
            let newFamily = family.filter((subFamily)=> state.tense.toUpperCase() == subFamily.tense.en)
            navigation.navigate("Progress", {screen: gameType,initial: false, params : {
              family: newFamily, 
              infinitive, 
              gameStyle: "MEDIUM_SINGLE_TENSE_PRACTICE", 
              tense_en: state.tense.toUpperCase(), 
              pattern, 
              noun_phrase
            }}); 
          }
    }


    const allowNextBtn = (nav) => nav.page.nActivePage < nav.selectionGroups.length - 1
    const allowPrevBtn = (nav) => nav.page.nActivePage > 0
    const allowStartBtn = (nav) => nav.readyToStart
//loop through 

const disableBtns = () => {
  dispatch({type: "disableBtns"})
}


const answerContainerX = useState(new Animated.Value(1))[0];

const slideInLeft = () => {
  disableBtns()
  Animated.sequence([
    Animated.timing(answerContainerX, {
      toValue: 2,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(answerContainerX, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }),
  ]).start(() => {
    nextPage();
    Animated.spring(answerContainerX, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });
};

const slideInRight = () => {
  disableBtns()
  Animated.sequence([
    Animated.timing(answerContainerX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(answerContainerX, {
      toValue: 2,
      duration: 0,
      useNativeDriver: true,
    }),
  ]).start(() => {
    lastPage();
    Animated.spring(answerContainerX, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });
};

    return (
      <View style={styles.container}>
        <HebrootsModal
          message="Please select both a game and tense in order to start."
          buttons={[
            {
              name: "Ok",
              callback: () => {
                dispatch({ type: "close" });
              },
            },
          ]}
          visibility={state.modalVisibility}
        />
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'transparent'
          }}
        >
          <Bird
            style={{
              left: 15,
              top: 5, 
              
            }}
            birdType={'Standard'}
            size={'Medium'}
          />
          <Text
              style={{ marginLeft: 40,fontSize: 40, fontFamily: "Rubik_300Light", fontWeight: "bold" }}
            >
              {infinitive}
            </Text>
        </View>
        <Animated.View
          style={[
            {
              ...styles.body,
              transform: [
                {
                  translateX: answerContainerX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
                  }),
                },
              ],
              
            },
          ]}
        >
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: "center",
              width: SCREEN_WIDTH/1.01,
              flex: 1
            }}
            horizontal={false}
            numColumns={1}
            data={state.selectionGroups[state.page.nActivePage].options}
            renderItem={renderItem}
            keyExtractor={(item) => item.imgUrl}
            scrollEnabled={false}
          />
          </Animated.View>
          <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <SmallYellowButton onClick={slideInRight} name="Previous" disabled={!state.allowPrevBtn} />
          

            <SmallYellowButton onClick={slideInLeft} name="Continue" disabled={!state.allowNextBtn} />

          </View>
          <View style={{borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SmallYellowButton onClick={() => navigateToTraining(state)} name="Start" disabled={!allowStartBtn(state)} />
            </View>
      </View>
    );
}
//<Header><SearchBar onEnter={() => onSearch} /></Header>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: 'white'
      },
      rowTitle: {
        fontFamily: 'Nunito_300Light',
        fontSize: normalize(20)
      },
    header : {
        backgroundColor: 'rgba(44, 128, 255, 0.72)',
        alignItems: 'center',
        justifyContent: 'center',
        height: '13%',
        width: '100%'
    },
    body: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH
    },
    card: {
        width: '80%',
        flex: 1
    }
  });

export default SelectTrainingType;