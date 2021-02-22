import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Card from "../Components/Card.js";
import Conjugation from "../Components/Conjugation";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import UnderlinedText from "../Components/UnderlinedText";
import Root from "../Components/Root";
import { normalize } from "../Actions/Normalize.js";

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
};

const _renderConjugations = ({ item, index }) => {
  var { pattern, tense, root, translatedInfinitive } = item;
  const renderItem = ({ item }) => {
    var { conjugation, possession } = item;
    return (
      <View style={{ ...styles.conjugationRow }}>
        <View>
          <Conjugation
            conjugation={conjugation}
            morphology={possession.morphology}
            pattern={pattern.pattern}
            tense={tense.en}
            fontSize={normalize(18)}
          />
        </View>
        <View
          style={{
            width: 100,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <UnderlinedText
            bubbleVisible={false}
            translation={'pronoun meaning "' + possession.en_pronoun + '"'}
            word={possession.possession}
          >
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
      <Card
        style={{
          flex: 1,
          shadowColor: "black",
          paddingTop: 15,
          paddingBottom: 10,
          borderRadius: 15
        }}
      >
        <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            width: SCREEN_WIDTH / 1.15,
            marginTop: -10,
            zIndex: 0,
          }}
          ListHeaderComponent={
            <>
              <View style={{ ...styles.headerRow, marginBottom: 0 }}>
                <UnderlinedText
                  bubbleVisible={false}
                  translation={
                    'The word for "' + item.tense.en.toLowerCase() + '" tense'
                  }
                  word={item.tense.he}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "Poppins_300Light",
                    }}
                  >
                    {item.tense["he"]}
                  </Text>
                </UnderlinedText>
              </View>
              <View
                style={{
                  ...styles.headerRow,
                }}
              >
                <Text style={{ fontSize: 22, fontFamily: "Poppins_300Light" }}>
                  {pattern.name}
                </Text>
                <Root base_form={root} pattern={pattern.pattern} />
                <TouchableWithoutFeedback
                  onPress={() => item.toggle(item.showTranslation)}
                >
                  <UnderlinedText
                    bubbleVisible={false}
                    translation={
                      'The infinitive form of a verb meaning [to] "' +
                      translatedInfinitive +
                      '"'
                    }
                    word={item.infinitive}
                  >
                    <Text
                      style={{ fontSize: 22, fontFamily: "Poppins_300Light" }}
                    >
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
            alignSelf: "center",
            marginRight: 10,
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  conjugationText: {
    fontSize: normalize(18),
    fontFamily: "Poppins_300Light",
  },
  conjugationRow: {
    padding: 5,
    marginHorizontal: 30,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
  },
  headerRow: {
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "95%",
    flex: 1,
  },
});
export default _renderConjugations;
