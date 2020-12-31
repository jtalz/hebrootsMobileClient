import React, {useReducer, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Animated } from 'react-native';
import Bird from '../../Components/Characters/Bird.js'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Actions/ScreenDimensions'
import {normalize} from '../../Actions/Normalize'
import SmallYellowButton from '../../Components/Buttons/SmallYellowButton.js';
import HebrootsModal from "../../Components/HebrootsModal";
import _3DButton from '../../Components/Buttons/_3DButton'

const slideInLeft = (dispatch, slidingContainerX, tense) => {
  dispatch({type: 'selectTense', payload: tense})
  /* disableBtns(dispatch) */
  Animated.sequence([
    Animated.timing(slidingContainerX, {
      toValue: 2,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(slidingContainerX, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }),
  ]).start(() => {
    nextPage(dispatch);
    Animated.spring(slidingContainerX, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });
};

const slideInRight = (dispatch, slidingContainerX) => {
  
  disableBtns(dispatch)
  Animated.sequence([
    Animated.timing(slidingContainerX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(slidingContainerX, {
      toValue: 2,
      duration: 0,
      useNativeDriver: true,
    }),
  ]).start(() => {
    lastPage(dispatch);
    Animated.spring(slidingContainerX, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });
};
const disableBtns = (dispatch) => {
  dispatch({type: "disableBtns"})
}

const nextPage = (dispatch) => {
  dispatch({type: 'nextPage'})
}

const lastPage = (dispatch) => {
  dispatch({type: 'lastPage'})
}

const selectTense = (tense, dispatch) => {
  dispatch({type: 'selectTense', payload: tense})
  console.log('tense selected')
}

const selectGame = (dispatch, game) => {
  dispatch({type: 'selectGame', payload: game})
}

const SELECTION_GROUPS = [
/*   {
    title: "Select a tense",
    onSelect: (dispatch, tense, answerContainerX) => slideInLeft(dispatch, answerContainerX, tense),
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
  }, */
  {
    title: "Select a game",
    onSelect: (dispatch, game) => selectGame(dispatch, game),
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

const selectionReducer = (state, action) => {
  if (action.type == "selectTense"){
    return {...state, tense: action.payload, allowNextBtn: false, allowPrevBtn: false, clickable: false}
  }else if (action.type == "selectGame"){
    return {...state, game: action.payload, readyToStart: true}
  }else if (action.type == "nextPage"){
    return {...state, page: { nActivePage: state.page.nActivePage+1, activePageTitle: state.selectionGroups[state.page.nActivePage+1].title}, allowPrevBtn:  state.page.nActivePage + 1 > 0, clickable: true}
  }else if (action.type == "lastPage"){
    return {...state, page: { nActivePage: state.page.nActivePage-1, activePageTitle: state.selectionGroups[state.page.nActivePage-1].title }, allowPrevBtn:  state.page.nActivePage - 1 > 0, clickable: true}
  }else if (action.type == "pleaseSelectGameAndTense"){
    return {...state, modalVisibility: true}
  }else if (action.type == "close"){
    return {...state, modalVisibility: false}
  }else if (action.type == "disableBtns"){
    return {...state, allowNextBtn: false, allowPrevBtn: false}
  }
}

const ExerciseSelection = ({ route, navigation }) => {

    const {pattern, family, infinitive, noun_phrase, tense} = route.params;

    const initialState = {
      tense,
      game: "",
      page: {
        nActivePage: 0,
        activePageTitle: SELECTION_GROUPS[0].title
      },
      selectionGroups: SELECTION_GROUPS,
      readyToStart: false,
      modalVisibility: false,
      allowNextBtn: true,
      allowPrevBtn: false,
      clickable: true
    }
/*     const [verbSet, setVerbSet] = useState([]) */
    const [state, dispatch] = useReducer(selectionReducer, initialState)


        const renderItem = ({ item }) => {
            if (state.tense == 'Present' && item.name == 'Matching'){
              return null
            }else{
            return <_3DButton 
              width ={SCREEN_WIDTH-60}
              height = {SCREEN_HEIGHT/8} 
              textSize = {normalize(30)}
              color = {'black'}
              backgroundColor = {isSelected(item.name)}
              borderWidth = {1}
              borderRadius = {5}
              borderColor = {'#C0C0C0'}
              backgroundShadow = {'white'}
              backgroundDarker = {'#C0C0C0'}
              backgroundActive = {'#99CC66'}
              onPress = {() => 
                state.selectionGroups[state.page.nActivePage].onSelect(dispatch, item.name, answerContainerX)} 
              name = {item.name}
              enabled = {state.clickable}
              style = {{marginVertical: SCREEN_HEIGHT/80}}
              fontSize = {normalize(24)}
            />
            }
          };
        const isSelected = (name) => {
          if (name == state.game || name == state.tense){
            return '#99CC66'
          }else
            return 'white'
        }


        const navigateToTraining = () => {
            /* 1. Navigate to the Details route with params */
            if(state.tense == "" || state.game == ""){
              dispatch({type: 'pleaseSelectGameAndTense'})
            }else{
            let gameType;
            if (state.game == 'Matching'){
              gameType = "Matching";
            }else if (state.game == "Quiz"){
              gameType = "MultipleChoice"
            }else{
              gameType = "Writing"
            }
            let newFamily = family.filter((subFamily)=> state.tense.toUpperCase() == subFamily.tense.en)
            navigation.navigate("Play", {screen: gameType,initial: false, params : {
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

const answerContainerX = useState(new Animated.Value(1))[0];

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
            keyExtractor={item=>item.name}
            renderItem={renderItem}
            scrollEnabled={false}
          />
          </Animated.View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <SmallYellowButton onClick={() => slideInRight(dispatch, answerContainerX)} name="Previous" disabled={!state.allowPrevBtn} />
          

            {/* <SmallYellowButton onClick={()=>slideInLeft(dispatch, answerContainerX)} name="Continue" disabled={!state.allowNextBtn} /> */}
  <SmallYellowButton onClick={() => navigateToTraining(state)} name="Start" disabled={!allowStartBtn(state)} />
          </View>
          {/* <View style={{borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            </View> */}
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

export default ExerciseSelection;