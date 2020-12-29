import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import Conjugation from "./Conjugation";

import { normalize } from "../Actions/Normalize";
import UnderlinedText from "./UnderlinedText";
import getHebrewConsonantCodes from "../Actions/GetMethods/GetHebrewConsonantCodes";

const SentenceWithVerb = ({
  possession,
  tense,
  verb,
  answered,
  morphology,
  style,
  tense_en,
  pattern,
  noun_phrase,
  gameStyle,
  handleTextInput,
  inputValue,
  inputEnabled,
  pronoun_en,
  spaceLayout,
  setSpaceLayout
}) => {
  const getProperInputFormat = (gameStyle) => {
    if (gameStyle == "MultiChoiceQuiz") {
      /*return answered !== "unanswered" ? (
        <View
          style={{
            width: normalize(getHebrewConsonantCodes(verb).length*25),
            height: 45,
            borderBottomColor: "black",
            borderWidth: 1,
            borderColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Conjugation
            conjugation={verb}
            morphology={morphology}
            pattern={pattern}
            tense={tense_en}
            fontSize={normalize(20)}
          />
        </View>
      ) :  */
      return (
        <View
          style={{
            width: normalize(getHebrewConsonantCodes(verb).length*20),
            height: 45,
            borderBottomColor: "black",
            borderWidth: 1,
            borderColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Text>{spaceLayout.x} , {spaceLayout.y}</Text> */}
        </View>
      );
    } else if (gameStyle == "Writing") {
      return answered !== "unanswered" ? (
        <View
          style={{
            width: (verb.length * normalize(20)) / 2,
            height: 45,
            borderBottomColor: "black",
            borderWidth: 1,
            borderColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Conjugation
            conjugation={verb}
            morphology={morphology}
            pattern={pattern}
            tense={tense_en}
            fontSize={normalize(20)}
          />
        </View>
      ) : (
        <View
          style={{
            width: (verb.length * normalize(20)) / 2,
            height: 45,
            borderBottomColor: "black",
            borderWidth: 1,
            borderColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ ...styles.text, width: "100%", textAlign: "center" }}
            placeholder=""
            onChangeText={(text) => handleTextInput(text)}
            underlineColorAndroid="transparent"
            allowFontScaling={false}
            value={inputValue}
            editable={inputEnabled}
            autoFocus={true}
          />
        </View>
      );
    }
  };

  return (
      <View
        style={{
          ...style,
          flexDirection: "row-reverse",
          justifyContent: 'flex-start',
          alignItems: "flex-start",
          marginVertical: 20,
          width: SCREEN_WIDTH,
          flexWrap: 'wrap'

        }}
        
      >
        <View
          style={{
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UnderlinedText bubbleVisible={false} translation={'The word for "' + pronoun_en.toLowerCase()+'"'} word={possession}>
            <Text style={styles.text}>
              {(function () {
                switch (morphology) {
                  case "FIRST+F+SINGULAR":
                    return possession + " (נ)";
                    break;
                  case "FIRST+M+SINGULAR":
                    return possession + " (ז)";
                    break;
                  case "FIRST+F+PLURAL":
                    return possession + " (נ)";
                    break;
                  case "FIRST+M+PLURAL":
                    return possession + " (ז)";
                    break;
                  default:
                    return possession;
                    break;
                }
              })()}
            </Text>
          </UnderlinedText>
        </View>
        <View 
          onLayout={
            event=>
            {
              setSpaceLayout({x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y})
            }
          }
          >
        {getProperInputFormat(gameStyle)}
        </View>
        {noun_phrase !== null ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: 0,
            }}
          >
            <Text style={{ ...styles.text }}>{noun_phrase.phrase}</Text>
            <Image
              style={{
                height: 75,
                width: 75,
                alignSelf: "flex-start",
                marginBottom: -75,
                marginLeft: 20,
              }}
              source={{ uri: noun_phrase.img }}
            />
          </View>
        ) : null}
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 24,
    fontFamily: "Rubik_300Light",
    fontSize: normalize(20),
    paddingVertical: 10
  },
});

export default SentenceWithVerb;
