import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import indicateGender from "../../../services/utils/indicateGender";
import { Sizing, Spacing, Typography } from "../../../styles";
import { Underline, WritingQInput } from "../../atoms";
import { UnderlinedText } from "../decoration";

const SentenceWithVerb = ({
  possession,
  verb,
  answered,
  morphology,
  tense_en,
  pattern,
  noun_phrase,
  gameStyle,
  handleTextInput,
  inputValue,
  inputEnabled,
  pronoun_en,
  setLandingZoneCoordinates,
  focusOnInput,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (focusOnInput && inputRef !== null) inputRef.current.focus();
  }, [focusOnInput]);

  return (
    <View style={styles.container}>
      <View style={styles.right}>
        <UnderlinedText
          bubbleVisible={false}
          translation={'The word for "' + pronoun_en.toLowerCase() + '"'}
          word={possession}
        >
          <Text style={styles.text}>
            {indicateGender(morphology, possession)}
          </Text>
        </UnderlinedText>
      </View>
      <View
        onLayout={
          setLandingZoneCoordinates
            ? (event) => {
                setLandingZoneCoordinates({
                  x: event.nativeEvent.layout.x,
                  y: event.nativeEvent.layout.y,
                });
              }
            : null
        }
      >
        {gameStyle == "Writing" ? (
          <WritingQInput
            answered={answered}
            verb={verb}
            morphology={morphology}
            pattern={pattern}
            tense_en={tense_en}
            inputEnabled={inputEnabled}
            inputRef={inputRef}
            inputValue={inputValue}
            handleTextInput={handleTextInput}
          />
        ) : (
          <Underline verb={verb} />
        )}
      </View>
      {noun_phrase !== null ? (
        <View style={styles.left}>
          <Text style={styles.text}>{noun_phrase.phrase}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 24,
    paddingVertical: 10,
    ...Typography.light,
    ...Typography.size18,
  },
  container: {
    ...Spacing.justifyStart,
    ...Spacing.alignStart,
    width: Sizing.SCREEN_WIDTH,
    flexWrap: "wrap",
    marginVertical: 20,
    flexDirection: "row-reverse",
  },
  right: {
    height: 45,
    ...Spacing.centerCenter,
  },
  left: {
    ...Spacing.alignEnd,
  },
});

export default SentenceWithVerb;
