import React, {useState} from 'react';
import { Image, FlatList, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Bird from '../../Components/Characters/Bird.js'
import RoundCustomButton from '../../Components/Buttons/RoundCustomButton.js'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Actions/GetMethods/ScreenDimensions'
import {normalize} from '../../Actions/Normalize'

const SelectTrainingType = ({ route, navigation }) => {
    const {pattern, family, infinitive, noun_phrase} = route.params;
/*     const [verbSet, setVerbSet] = useState([]) */
    const VerbSets = [
        {
          title: 'Past',
          level: 'In order',
          type: 'Quiz',
          tenses: ['PAST'],
                     imgUrl: 'https://user-images.githubusercontent.com/31594943/100296260-b9c19b00-2f59-11eb-991a-f07a739fb59d.png',
          gameStyle: 'EASY_SINGLE_TENSE_PRACTICE'
      }, 
      {
        title: 'Past',
        level: '',
        type: 'Matching',
        tenses: ['PAST'],
               imgUrl: 'https://user-images.githubusercontent.com/31594943/100296248-b29a8d00-2f59-11eb-8b7b-348a24eb5ef6.png',
        gameStyle: 'MEDIUM_SINGLE_TENSE_PRACTICE'
    },
      {
          title: 'Past',
          level: 'Shuffled',
          type: 'Quiz',
          tenses: ['PAST'],
                 imgUrl: 'https://user-images.githubusercontent.com/31594943/100774268-e2b9b400-33cf-11eb-854c-71980b1c317d.png',
          gameStyle: 'MEDIUM_SINGLE_TENSE_PRACTICE'
      }, 
      
        {
          title: 'Future',
          level: 'In order',
          type: 'Quiz',
          tenses: ['FUTURE'],
               imgUrl: 'https://user-images.githubusercontent.com/31594943/100774054-abe39e00-33cf-11eb-96c8-a7d17d753d55.png',
          gameStyle: 'EASY_SINGLE_TENSE_PRACTICE'
      }, 
      {
        title: 'Future',
        level: '',
        type: 'Matching',
        tenses: ['FUTURE'],
                imgUrl: 'https://user-images.githubusercontent.com/31594943/100774424-0e3c9e80-33d0-11eb-914d-3ea4931750a0.png',
        gameStyle: 'MEDIUM_SINGLE_TENSE_PRACTICE'
      },
      {
        title: 'Future',
        level: 'Shuffled',
        type: 'Quiz',
        tenses: ['FUTURE'],
                  imgUrl: 'https://user-images.githubusercontent.com/31594943/100774179-cf0e4d80-33cf-11eb-93d0-36a0aade7b22.png',
        gameStyle: 'MEDIUM_SINGLE_TENSE_PRACTICE'
    }, 
        
        {
          title: 'Present',
          level: 'In order',
          type: 'Quiz',
          tenses: ['PRESENT'],
                   imgUrl: 'https://user-images.githubusercontent.com/31594943/100296256-b75f4100-2f59-11eb-87fd-ffe20eed3297.png',
          gameStyle: 'EASY_SINGLE_TENSE_PRACTICE'
      }, 
      {
          title: 'Present',
          level: 'Shuffled',
          type: 'Quiz',
          tenses: ['PRESENT'],
               imgUrl: 'https://user-images.githubusercontent.com/31594943/100296142-72d3a580-2f59-11eb-8193-b68e7334d12a.png',
          gameStyle: 'MEDIUM_SINGLE_TENSE_PRACTICE'
      },
      
    ]
  
      const getBackgroundColorForTense = (tenseBg) => {
        if (tenseBg == "Past"){
          return 'green'
        }else if (tenseBg == "Present"){
          return 'blue'
        }else if (tenseBg == "Future"){
          return 'yellow'
        }
      }

        const renderItem = ({ item }) => (
            <View style={{width: SCREEN_WIDTH*.29, height: SCREEN_HEIGHT*.2, justifyContent: 'center', margin: 5}}>
                <RoundCustomButton 
                    imgUrl={item.imgUrl} 
                    name={{/* type: item.type,level: item.level */}} 
                    onPress={() => navigateToTraining(item.tenses, item.gameStyle, item.type)} 
                />
            </View>
        );


        const navigateToTraining = (tenses, gameStyle, type) => {
            /* 1. Navigate to the Details route with params */
            let gameType = 'MultiChoiceTraining';
            if (type == 'Matching'){
              gameType = 'MatchingTraining';
            }
            let newFamily = family.filter((subFamily)=> tenses.includes(subFamily.tense.en))
            navigation.navigate("Progress", {screen: gameType,initial: false, params : {
              family: newFamily, infinitive, gameStyle, tense_en: tenses[0], pattern, noun_phrase
            }}); 
          
    }
//loop through 
    return (
      <View style={styles.container}>
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
        <View style = {styles.body}>
          <View style={{position: 'absolute', width: SCREEN_WIDTH, height: '100%', top: 0}}>
            <View style={{flex: 1, width: SCREEN_WIDTH, borderColor: '#a5ff5c', borderWidth: 1, alignItems: 'center'}}>
              <Text style={{...styles.rowTitle}}>Past</Text>
            </View>
            <View style={{flex: 1, width: SCREEN_WIDTH, borderColor: '#fffa5c', borderWidth: 1, alignItems: 'center'}}>
            <Text style={{...styles.rowTitle}}>Future</Text>
            </View>
            <View style={{flex: 1, width: SCREEN_WIDTH, borderColor: '#5ce9ff', borderWidth: 1, alignItems: 'center'}}>
            <Text style={{...styles.rowTitle}}>Present</Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: "center",
              width: SCREEN_WIDTH/1.01,
              flex: 1
            }}
            horizontal={false}
            numColumns={3}
            data={VerbSets}
            renderItem={renderItem}
            keyExtractor={(item) => item.imgUrl}
            scrollEnabled={false}
          />
          
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