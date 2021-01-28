import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableHighlight, Animated, FlatList, Modal, ActivityIndicator } from 'react-native';
import timedAnimation from '../../Actions/Animations/timedAnimation';
import { requestPracticeVerbs, requestVerbFromValue } from '../../Actions/APIRequests';
import getRandomImg from '../../Actions/GetMethods/GetRandomImage';
import organizeVerbsByType from '../../Actions/ObjectManipulations/OrganizePracticeVerbs';
import { SCREEN_HEIGHT } from '../../Actions/ScreenDimensions';
import RoundCustomButton from '../../Components/Buttons/RoundCustomButton';
import Bird from '../../Components/Characters/Bird'

const UserProgress = ({ route, navigation }) => {
    
    const [state, setState] = useState({organizedPracticeObjects: false, loading: false});

    useEffect(()=>{
        setPracticeVerbs()
    }, [])

    const setPracticeVerbs = async () => {
        const practiceVerbs = await requestPracticeVerbs()
        const organizedPracticeObjects = organizeVerbsByType(practiceVerbs.practiceVerbs)
        setState({...state, organizedPracticeObjects})
    }

//fetch some verbs from the API with the appropriate data for a click -> game option 
//create tabs 1 per binyan/tense combination
//on tab open -> height increase 
//inside the view will be -> 3 buttons each a seperate verb for practicing 
//display them here for a quick practice 
//make a big scrollview 
//with 5 different sections 
//each with a different verb
//use round buttons 
    const PracticeTabs = ({title, verbs}) => {
        return (
            <View>
                <PracticeTab title={title} tense={'Past'} verbs={verbs}/>
                <PracticeTab title={title} tense={'Present'} verbs={verbs}/>
                <PracticeTab title={title} tense={'Future'} verbs={verbs}/>
            </View>
        )
    }

    const quickPlay = async (verb, tense) => {
        setState({...state, loading: true})
        await requestVerbFromValue(verb.infinitive)
            .then(res => {
                let newFamily = res.organizedFamily.filter((subFamily)=> tense.toUpperCase() == subFamily.tense.en)
                setState({...state, loading: false})
                navigation.navigate("MultipleChoice", {
                    family: newFamily, 
                    gameStyle: "MEDIUM_SINGLE_TENSE_PRACTICE", 
                    infinitive: verb.infinitive,
                    pattern: verb.pattern.pattern,
                    noun_phrase: res.noun_phrase !== undefined ? res.noun_phrase : null,
                    tense_en: tense.toUpperCase()
                  }); 

            })

    }

    class QuickPlayButton extends Component {


        shouldComponentUpdate(nextProps){
            if (nextProps.name !== this.props.name) { 
                return true; 
              } else { 
                return false; 
              } 
        }
        render(){
            return (
            <View>
                <RoundCustomButton name={this.props.name} imgUrl={this.props.imgUrl} onPress={this.props.onPress} />
            </View>
        )
        }
        
    }

    

    const PracticeTab = ({tense, title, verbs}) => {

        const animatedHeight = new Animated.Value(0)
        const [isOpen, setOpen] = useState(false)

        const renderQuickPlayButton = ({item}) => {
            return (
                <QuickPlayButton name={item.infinitive} imgUrl={getRandomImg()} onPress={()=>quickPlay(item, tense)} />
            )
        }

        const openPracticeTab = () => {
            Animated.timing(animatedHeight, {
                toValue: 200,
                useNativeDriver: false
              }).start(()=>{
                setOpen(!isOpen)
              });              
        }
    
        const closePracticeTab = () => {
            Animated.timing(animatedHeight, {
                toValue: 0,
                useNativeDriver: false
              }).start(()=>{
                  setOpen(!isOpen)
              });
        }

        const TabButton = ({title, tense, isOpen}) => {
            return (
                <TouchableHighlight onPress={() => {
                    isOpen ? closePracticeTab() : openPracticeTab()
                    }}>
                    <View style={{height: SCREEN_HEIGHT/15, padding: 5, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                        <Text>
                            {title} {tense} Tense
                        </Text>
                    </View>
                </TouchableHighlight>
            )
        }
        return (
            <View style={{flexDirection: 'column'}}>
            <TabButton isOpen={isOpen} title={title} tense={tense} />
            <Animated.View style={[
                styles.practiceTab,
                {
                    height: animatedHeight
                }
            ]}>
                <FlatList 
                    data={verbs}
                    contentContainerStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    horizontal={true}
                    renderItem={renderQuickPlayButton}
                    keyExtractor={(item) => item._id}
                    scrollEnabled={true}
                    
                />
            </Animated.View>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <Modal 
                visible={state.loading}
                transparent={true}
                animationType={'fade'}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                {
                    state.organizedPracticeObjects ? 
                    Object.keys(state.organizedPracticeObjects).map((key, index)=>{
                        return <PracticeTabs key={index} 
                        title={state.organizedPracticeObjects[key].name}
                        verbs={state.organizedPracticeObjects[key].verbs} />
                    })
                    : 
                    null
                }
            </ScrollView>
        </View>
    )
}
//<Header><SearchBar onEnter={() => onSearch} /></Header>
const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    intro: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10
    },
    listItem: {
        alignItems: 'center',
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 8,
    },
    practiceTab: {
        height: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
  });

export default UserProgress;