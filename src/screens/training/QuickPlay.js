import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Bird, LoadingIndicator } from "../../components/atoms";
import { IntroModal, QuickPlayRow } from "../../components/molecules";
import {
  requestPracticeVerbs,
  organizeVerbsByType,
  requestVerbConjugations,
} from "../../services";
import { Colors, Sizing, Spacing, Typography } from "../../styles";

const QuickPlayScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    organizedPracticeObjects: false,
    loading: false,
    introModal: false,
  });

  useEffect(() => {
    setPracticeVerbs();
  }, []);

  const closeIntro = () => setState({ ...state, introModal: false });

  const setPracticeVerbs = () => {
    requestPracticeVerbs()
      .then((practiceVerbs) => organizeVerbsByType(practiceVerbs.practiceVerbs))
      .then((organizedPracticeObjects) =>
        setState({ ...state, organizedPracticeObjects, introModal: true })
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

  const HorizontalLine = ({ txtWidth }) => (
    <View style={styles.horizontalLine} />
  );

  const renderQuickPlayTabs = (tense) => {
    return Object.keys(state.organizedPracticeObjects).map((key, index) => {
      return (
        <QuickPlayRow
          key={index}
          index={index}
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
      {/* <IntroModal visibility={state.introModal} goFn={() => closeIntro()} /> */}
      {state.loading ? (
        <View style={styles.centeredView}>
          <Bird birdType="Old" size="Medium" style={{ marginBottom: 50 }} />
          <Text style={styles.text}>Taking you to training...</Text>
          <LoadingIndicator />
        </View>
      ) : state.organizedPracticeObjects ? (
        <ScrollView style={{}}>
          <>
            <View style={styles.title}>
              <Text style={styles.text}>Try out your skills</Text>
              <Text style={styles.textSmall}>
                Start by opening any of the following tabs. Then select a verb.
              </Text>
              <Bird
                birdType="Old"
                size="SmallPlus"
                style={{ marginVertical: 15 }}
              />
            </View>
            <View style={styles.titleRow}>
              <HorizontalLine />
              <Text style={styles.text}>Past Tense (עבר)</Text>
              <HorizontalLine />
            </View>
            {renderQuickPlayTabs("Past")}
            <View style={styles.titleRow}>
              <HorizontalLine />
              <Text style={styles.text}>Present Tense (הווה)</Text>
              <HorizontalLine />
            </View>
            {renderQuickPlayTabs("Present")}
            <View style={styles.titleRow}>
              <HorizontalLine />
              <Text style={styles.text}>Future Tense (עתיד)</Text>
              <HorizontalLine />
            </View>
            {renderQuickPlayTabs("Future")}
          </>
        </ScrollView>
      ) : (
        <View style={styles.centeredView}>
          <Bird birdType="Old" size="Medium" style={{ marginBottom: 50 }} />
          <Text style={styles.text}>We'll be ready in a second...</Text>
          <LoadingIndicator />
        </View>
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
  title: {
    ...Spacing.justifyAround,
    ...Spacing.alignCenter,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  titleRow: {
    ...Spacing.row,
    ...Spacing.justifyAround,
    ...Spacing.alignCenter,
  },
  text: {
    ...Typography.light,
    ...Typography.size16,
    ...Colors.txtMagenta,
    ...Typography.taCenter,
    marginVertical: 5,
  },
  textSmall: {
    ...Typography.light,
    ...Typography.size12,
    ...Colors.txtMagenta,
    ...Typography.taCenter,
    marginVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  horizontalLine: {
    borderBottomColor: Colors.magenta,
    borderBottomWidth: 1,
    width: Sizing.SCREEN_WIDTH / 5,
  },
});

export default QuickPlayScreen;
