import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Sizing, Spacing, Typography } from "../styles";
import Root from "./Root";
import UnderlinedText from "./UnderlinedText";

const ConjugationTableHeader = ({
  tense_he,
  infinitive,
  root,
  pattern,
  translatedInfinitive,
  tense_en,
}) => {
  return (
    <>
      <View style={styles.headerRow}>
        <UnderlinedText
          bubbleVisible={false}
          translation={'The word for "' + tense_en.toLowerCase() + '" tense'}
          word={tense_he}
        >
          <Text style={styles.text}>{tense_he}</Text>
        </UnderlinedText>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.text}>{pattern.name}</Text>
        <Root base_form={root} pattern={pattern.pattern} />
        <UnderlinedText
          bubbleVisible={false}
          translation={
            'The infinitive form of a verb meaning [to] "' +
            translatedInfinitive +
            '"'
          }
          word={infinitive}
        >
          <Text style={styles.text}>{infinitive}</Text>
        </UnderlinedText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    alignSelf: "center",
    ...Spacing.row,
    marginBottom: 15,
    ...Spacing.justifyAround,
    ...Spacing.alignEnd,
    width: "95%",
    ...Sizing.f1,
  },
  text: {
    ...Typography.size16,
    ...Typography.regular,
  },
});

export default ConjugationTableHeader;
