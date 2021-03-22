import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Spacing, Typography } from "../../../styles";
import { requestExampleVerb } from "../../../services";
import { ConjugationText } from "../../atoms";

const ExampleVerb = ({
  fontSize,
  pattern_id,
  morphology,
  pattern,
  tense,
  form,
}) => {
  const [exampleVerb, setExampleVerb] = useState({
    infinitive: "loading...",
    base_form: "loading...",
  });

  const displayNewExampleVerb = (pattern_id) => {
    requestExampleVerb(pattern_id, morphology).then((exampleVerb) =>
      setExampleVerb(exampleVerb)
    );
  };

  useEffect(() => {
    displayNewExampleVerb(pattern_id);
  }, []);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => displayNewExampleVerb(pattern_id)}
    >
      <ConjugationText
        fontSize={fontSize}
        conjugation={exampleVerb[form]}
        morphology={morphology}
        pattern={pattern}
        tense={tense}
      />
      <Text style={styles.text}>Tap for another</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Spacing.centerCenter,
    padding: 5,
  },
  text: {
    ...Typography.light,
    ...Typography.size10
  }
});

export default ExampleVerb;
