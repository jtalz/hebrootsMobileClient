import React from "react";
import { StyleSheet, Text, View } from "react-native";
import indicateGender from "../Actions/indicateGender";
import { normalize } from "../Actions/Normalize";
import Conjugation from "./Conjugation";
import UnderlinedText from "./UnderlinedText";

const ConjugationRow = ({ item, pattern, tense }) => {
  var { conjugation, possession } = item;
  return (
    <View style={styles.conjugationRow}>
      <View>
        <Conjugation
          conjugation={conjugation}
          morphology={possession.morphology}
          pattern={pattern.pattern}
          tense={tense.en}
          fontSize={normalize(18)}
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
    fontSize: normalize(18),
    fontFamily: "Poppins_300Light",
  },
});

export default ConjugationRow;
