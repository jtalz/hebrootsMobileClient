import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { normalize } from "../Actions/Normalize";
import { Spacing, Typography } from "../styles";
import getHebrewConsonantCodes from '../Actions/GetMethods/GetHebrewConsonantCodes'
import Conjugation from '../Components/Conjugation'

const GameInput = ({
  answered,
  verb,
  morphology,
  pattern,
  tense_en,
  inputEnabled,
  inputRef,
  inputValue,
  handleTextInput
}) => {
  const styles = StyleSheet.create({
    underline: {
      width: normalize(getHebrewConsonantCodes(verb).length * 20),
      height: 45,
      borderBottomColor: "black",
      borderWidth: 1,
      borderColor: "transparent",
      ...Spacing.centerCenter,
    },
    textInput: {
      marginHorizontal: 24,
      paddingVertical: 10,
      ...Typography.light,
      ...Typography.size18,
      width: (verb.length * normalize(20)) / 2,
      ...Typography.taCenter,
      alignSelf: "center",
    },
  });
  return answered !== "unanswered" ? (
    <View style={styles.underline}>
      <Conjugation
        conjugation={verb}
        morphology={morphology}
        pattern={pattern}
        tense={tense_en}
        fontSize={normalize(20)}
      />
    </View>
  ) : (
    <View style={styles.underline}>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder=""
          onChangeText={(text) => handleTextInput(text)}
          underlineColorAndroid="transparent"
          allowFontScaling={false}
          value={inputValue}
          editable={inputEnabled}
          ref={inputRef}
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

export default GameInput;
