import React, { useEffect, useReducer } from "react";
import { SafeAreaView, View } from "react-native";
import SearchBar from "../Components/SearchBar.js";
import Card from "../Components/Card";
import SmallYellowButton from "../Components/Buttons/SmallYellowButton";
import { navigateToPattern, navigateToTraining } from "../Actions/NavigateTo";
import Bird from "../Components/Characters/Bird";
import {
  conjugationTableReducer,
  initialState,
  setNewSearchedVerb,
  setActiveIndex,
  getTenseFromActiveIndex
} from "../Actions/Reducers/ConjugationTableReducer";
import StudySection from "../Containers/StudySection";
import exploreStyles from '../styles/exploreStyles'

const Explore = ({ navigation }) => {
  const [state, dispatch] = useReducer(conjugationTableReducer, initialState);

  useEffect(() => {
    setNewSearchedVerb(dispatch)("למד");
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container}>
      <View style={exploreStyles.searchArea}>
        {/* <Bird
          size="Small"
          style={{ left: 10, bottom: 0 }}
          birdType="Standard"
        /> */}
        <Card style={{ width: "90%", height: 50, borderRadius: 25, borderColor: '#2B78EC', borderWidth: 1 }}>
          <SearchBar onEnter={setNewSearchedVerb(dispatch)} />
        </Card>
      </View>
      <StudySection
        tableStatus={state.tableStatus}
        tableData={state.tableData}
        setActiveIndex={setActiveIndex(dispatch)}
        activeIndex={state.activeIndex}
        definedTranslation={state.tableData.translation}
      />
      <View style={exploreStyles.btnArea}>
        <SmallYellowButton
          name="Practice"
          onClick={() => 
            navigateToTraining(state, navigation, getTenseFromActiveIndex(state.activeIndex))}
          disabled={state.tableStatus == "Loading"}
          backgroundColor='#73D413'
        />
        <SmallYellowButton
          name="Lesson"
          onClick={() =>
            navigateToPattern(navigation, "PatternLesson", {
              pattern: state.tableData.pattern.pattern,
              name: state.tableData.pattern.name,
              aspects: state.tableData.pattern.aspects,
              infinitive_form: state.tableData.pattern.infinitive_form,
              pattern_id: state.tableData.pattern._id,
              subtopic: getTenseFromActiveIndex(state.activeIndex),
            })
          }
          disabled={state.tableStatus == "Loading"}
          backgroundColor='#4294DB'
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;