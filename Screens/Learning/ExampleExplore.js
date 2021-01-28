import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import StudySection from '../../Containers/StudySection'
import SmallYellowButton from "../../Components/Buttons/SmallYellowButton.js";
import Bird from "../../Components/Characters/Bird";
import {
  conjugationTableReducer,
  initialState,
  handleResponse
} from "../../Actions/Reducers/ConjugationTableReducer";
import { requestRandomVerbOfPattern } from "../../Actions/APIRequests";
import { sub } from "react-native-reanimated";

const ExampleExplore = ({ route, navigation }) => {
  const { pattern_id, subtopic } = route.params;
  const [state, dispatch] = useReducer(conjugationTableReducer, initialState);

  const handleRandomVerbRequest = async (pattern_id) => {
    dispatch({ type: "loadTableData" });
    let randomVerb = await requestRandomVerbOfPattern(pattern_id);
    handleResponse(randomVerb, dispatch);
  }

  useEffect(() => {
    handleRandomVerbRequest(pattern_id)
  }, []);

  const navigateToTraining = () => {
    let newFamily = state.tableData.family.filter((subFamily)=> subtopic.toUpperCase() == subFamily.tense.en)
    navigation.navigate("Play", {screen: "MultipleChoice",initial: false, params : {
      family: newFamily, 
      gameStyle: "MEDIUM_SINGLE_TENSE_PRACTICE", 
      infinitive: state.tableData.infinitive,
              pattern: state.tableData.pattern.pattern,
              noun_phrase: state.tableData.noun_phrase,
              tense_en: subtopic.toUpperCase()
    }}); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <Bird
          size="Small"
          style={{ left: 10, bottom: 0 }}
          birdType="Standard"
        />
        <Text
          style={{
            marginLeft: "10%",
            width: "55%",
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Bodoni 72",
          }}
        >
          Use this to review then move on to try out your skills
        </Text>
      </View>
      <StudySection 
        tableStatus = {state.tableStatus}
        tableData = {state.tableData}
        subtopic = {subtopic}
      />
      <View style={styles.btnArea}>
        <SmallYellowButton
          name="practice"
          onClick={() =>
            /* navigation.push("ExerciseSelection", { 
              family: state.tableData.family,
              infinitive: state.tableData.infinitive,
              pattern: state.tableData.pattern.pattern,
              noun_phrase: state.tableData.noun_phrase,
              tense: subtopic
            }) */
            navigateToTraining()
          }
        />
        <SmallYellowButton
          name="another"
          onClick={() => {
            dispatch({ type: "loadTableData" });
            handleRandomVerbRequest(pattern_id);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  searchArea: {
    width: "100%",
    flex: 0.8,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnArea: {
    flex: 1,
    marginBottom: -10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default ExampleExplore;
