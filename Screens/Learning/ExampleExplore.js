import React, { useEffect, useReducer } from "react";
import { SafeAreaView, Text, View } from "react-native";
import StudySection from "../../Containers/StudySection";
import SmallYellowButton from "../../Components/Buttons/SmallYellowButton.js";
import Bird from "../../Components/Characters/Bird";
import {
  conjugationTableReducer,
  initialState,
  setNewExampleVerb
} from "../../Actions/Reducers/ConjugationTableReducer";
import { navigateToTraining } from "../../Actions/NavigateTo";
import exploreStyles from '../../Style/exploreStyles'

const ExampleExplore = ({ route, navigation }) => {
  const { pattern_id, subtopic } = route.params;
  const [state, dispatch] = useReducer(conjugationTableReducer, initialState);

  useEffect(() => {
    setNewExampleVerb(pattern_id, dispatch);
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container}>
      <View style={exploreStyles.searchArea}>
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
        tableStatus={state.tableStatus}
        tableData={state.tableData}
        subtopic={subtopic}
        definedTranslation={state.tableData.translation}
      />
      <View style={exploreStyles.btnArea}>
        <SmallYellowButton
          name="Practice"
          onClick={() => 
            navigateToTraining(state, navigation, subtopic.toUpperCase())}
          disabled={state.tableStatus == "Loading"}
        />
        <SmallYellowButton
          name="another"
          onClick={() => {
            dispatch({ type: "loadTableData" });
            setNewExampleVerb(pattern_id, dispatch);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExampleExplore;