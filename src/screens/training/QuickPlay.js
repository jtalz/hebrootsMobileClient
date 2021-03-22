import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { LoadingIndicator } from "../../components/atoms";
import { QuickPlayRow } from "../../components/molecules";
import { requestPracticeVerbs, organizeVerbsByType, requestVerbConjugations } from "../../services";
import { Colors, Spacing, Typography } from "../../styles";

const QuickPlayScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    organizedPracticeObjects: false,
    loading: false,
  });

  useEffect(() => {
    setPracticeVerbs();
  }, []);

  const setPracticeVerbs = () => {
    requestPracticeVerbs()
      .then((practiceVerbs) => organizeVerbsByType(practiceVerbs.practiceVerbs))
      .then((organizedPracticeObjects) =>
        setState({ ...state, organizedPracticeObjects })
      )
      .catch((err) => console.error(err));
  };

  const quickPlay = (verb, tense) => {
    setState({ ...state, loading: true });
    requestVerbConjugations(verb.infinitive).then((res) => {
      setState({ ...state, loading: false });
      let newFamily = res.organizedFamily.filter(
        (subFamily) => tense.toUpperCase() == subFamily.tense.en
      );
      navigation.navigate("MultipleChoice", {
        family: newFamily,
        gameStyle: "MEDIUM_SINGLE_TENSE_PRACTICE",
        infinitive: verb.infinitive,
        pattern: verb.pattern.pattern,
        noun_phrase: res.noun_phrase !== undefined ? res.noun_phrase : null,
        tense_en: tense.toUpperCase(),
        translation: verb.translation,
      });
    });
  };

  const renderQuickPlayTabs = (tense) => {
    return Object.keys(state.organizedPracticeObjects).map((key, index) => {
      return (
        <QuickPlayRow
          key={index}
          title={state.organizedPracticeObjects[key].name_he}
          transliteration={state.organizedPracticeObjects[key].name}
          verbs={state.organizedPracticeObjects[key].verbs}
          tense={tense}
          quickPlay={quickPlay}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {state.loading ? (
        <View>
          <LoadingIndicator />
          <Text style={styles.text}>Taking you to training...</Text>
        </View>
      ) : (
        <ScrollView>
          {state.organizedPracticeObjects ? (
            <>
              <View style={styles.titleRow}>
                <Text style={styles.text}>Past Tense</Text>
                <Text style={styles.text}>עבר</Text>
              </View>
              {renderQuickPlayTabs("Past")}
              <View style={styles.titleRow}>
                <Text style={styles.text}>Present Tense</Text>
                <Text style={styles.text}>הווה</Text>
              </View>
              {renderQuickPlayTabs("Present")}
              <View style={styles.titleRow}>
                <Text style={styles.text}>Future Tense</Text>
                <Text style={styles.text}>עתיד</Text>
              </View>
              {renderQuickPlayTabs("Future")}
            </>
          ) : (
            <LoadingIndicator />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  titleRow: {
    ...Spacing.row,
    ...Spacing.justifyAround,
    ...Spacing.alignCenter,
    paddingHorizontal: 25,
  },
  text: {
    ...Typography.regular,
    ...Typography.size18,
    ...Colors.txtMagenta,
    ...Typography.taCenter,
    marginVertical: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default QuickPlayScreen;
