import React from "react";
import { StyleSheet, Text, View } from "react-native";
import indicateGender from "../../../services/utils/indicateGender";
import { Typography, Sizing } from "../../../styles";
import { ConjugationText } from "../../atoms";
import { UnderlinedText } from "../decoration";

const ConjugationTableRow = ({ item, pattern, tense }) => {
  var { conjugation, possession } = item;
  return (
    <View style={styles.conjugationRow}>
      <View>
        <ConjugationText
          conjugation={conjugation}
          morphology={possession.morphology}
          pattern={pattern.pattern}
          tense={tense.en}
          fontSize={Sizing.normalize(18)}
        />
      </View>
      <View style={styles.left}>
        <UnderlinedText
          bubbleVisible={false}
          translation={'pronoun meaning "' + possession.en_pronoun + '"'}
          word={possession.possession}
        >
          <Text style={styles.conjugationText}>
            {indicateGender(possession["morphology"], possession["possession"])}
          </Text>
        </UnderlinedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  left: {
    width: 100,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  conjugationText: {
    ...Typography.size18,
    fontFamily: "Poppins_300Light",
  },
});

export default ConjugationTableRow;
