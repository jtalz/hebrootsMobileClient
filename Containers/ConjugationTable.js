import React from 'react';
import { 
    Text,
    View,
    FlatList,
    TouchableWithoutFeedback,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import Card from "../Components/Card.js";
import Conjugation from '../Components/Conjugation'
import {extractTrueRoot} from '../Actions/GetMethods/ExtractTrueRoot'
import {SCREEN_WIDTH } from '../Actions/GetMethods/ScreenDimensions'
import UnderlinedText from '../Components/UnderlinedText'

const getPossessionWithGender = (possession) => {
    switch (possession["morphology"]) {
        case "FIRST+F+SINGULAR":
            return possession["possession"] + " (נ)";
            break;
        case "FIRST+M+SINGULAR":
            return possession["possession"] + " (ז)";
            break;
        case "FIRST+F+PLURAL":
            return possession["possession"] + " (נ)";
            break;
        case "FIRST+M+PLURAL":
            return possession["possession"] + " (ז)";
            break;
        default:
            return possession["possession"];
            break;
        }
}

const _renderConjugations = ({ item, index }) => {
    var {pattern, tense, root} = item;
    const renderItem = ({ item }) => {
      var { conjugation, possession } = item;
      return (
          <View style={{...styles.conjugationRow}}>
              <View>
                <Conjugation 
                    conjugation={conjugation} 
                    morphology={possession.morphology} 
                    pattern = {pattern.pattern}
                    tense = {tense.en}
                    fontSize = {24}
                  />
              </View>
                <View style={{width: 100, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <UnderlinedText bubbleVisible={false} translation={'Pronoun for "'+ possession.en_pronoun+'"'}>
                    <Text style={styles.conjugationText}>
                        {getPossessionWithGender(possession)}
                    </Text>
                  </UnderlinedText>
                </View>
          </View>
      );
    };

    return (
      <View style={{ height: "95%", marginRight: 3, marginLeft: 5 }}>
        <Card style={{ flex: 1, shadowColor: "black", paddingTop: 15, paddingBottom: 10 }}>
          <FlatList
            data={item.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{width: SCREEN_WIDTH/1.15, marginTop: -10, zIndex: 0}}
            ListHeaderComponent={
              <>
                <View style={{ ...styles.headerRow, marginBottom: 0 }}>
                  
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "Rubik_500Medium"
                    }}
                  >
                    {item.tense["he"]}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.headerRow
                  }}
                >
                  <Text style={{ fontSize: 22, fontFamily: "Rubik_400Regular" }}>
                    {pattern.name}
                  </Text>
                  <Text style={{ fontSize: 22, fontFamily: "Rubik_400Regular" }}>
                    {/* {root} */}
                    {
                      extractTrueRoot(root, pattern.pattern)
                    }
                  </Text>
                  <TouchableWithoutFeedback onPress={() => item.toggle(item.showTranslation)}>
                    <UnderlinedText bubbleVisible={false} translation={"translating..."}>
                      <Text style={{ fontSize: 22, fontFamily: "Rubik_400Regular" }}>
                        {item.infinitive}
                      </Text>
                    </UnderlinedText>
                </TouchableWithoutFeedback>
                </View>
              </>
            }
            ListHeaderComponentStyle={{
              marginBottom: 10,
              borderBottomColor: "rgba(0, 0, 0, 0.29)",
              borderBottomWidth: 1,
              width: 238,
              alignItems: "center",
              justifyContent: "center",
              height: 90,
               alignSelf: 'center',
               marginRight: 10,

            }}
          />
        </Card>
      </View>
    );
  }

const styles = StyleSheet.create({
    conjugationText: {
        fontSize: 22,
        fontFamily: 'Rubik_300Light'
    },
    conjugationRow: {
        padding: 5,
        marginHorizontal: 30,
        flexDirection: "row",
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        alignSelf: 'center',
        width: '50%'
    },
    headerRow: {
      alignSelf: 'center',
      flexDirection: "row",
      marginBottom: 15,
      justifyContent: 'space-around',
      alignItems: "flex-end",
      width: "95%",
      flex: 1
    }
})
  export default _renderConjugations;