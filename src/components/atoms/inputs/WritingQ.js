import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { getHebrewConsonantCodes } from "../../../services";
import { Spacing, Typography, Sizing } from "../../../styles";
import { ConjugationText } from "../text";

const WritingQInput = ({
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
      width: Sizing.normalize(getHebrewConsonantCodes(verb).length * 20),
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
      width: (verb.length * Sizing.normalize(20)) / 2,
      ...Typography.taCenter,
      alignSelf: "center",
    },
  });
  return answered !== "unanswered" ? (
    <View style={styles.underline}>
      <ConjugationText
        conjugation={verb}
        morphology={morphology}
        pattern={pattern}
        tense={tense_en}
        fontSize={Sizing.normalize(20)}
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

export default WritingQInput;
