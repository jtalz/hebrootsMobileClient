import React, { useEffect, useReducer } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Card, SearchBarInput, StadiumButton } from "../../components/atoms";
import { IntroModal } from "../../components/molecules";
import { StudySection } from "../../components/templates";
import {
  conjugationTableInitialState,
  conjugationTableReducer,
  setNewSearchedVerb,
  setActiveIndex,
  getTenseFromActiveIndex,
  navigateToTraining,
  navigateToPattern
} from "../../services";
import { Colors, exploreStyles } from "../../styles";

const ExploreScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(
    conjugationTableReducer,
    conjugationTableInitialState
  );

  useEffect(() => {
    setNewSearchedVerb(dispatch)("למד");
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container}>
      <View style={exploreStyles.title}>
        <Text style={exploreStyles.textSmall}>Find complete verb tables. Scroll right.</Text>
      </View>
      <View style={exploreStyles.searchArea}>
        <Card
          style={{
            width: "90%",
            height: 45,
            borderRadius: 25,
            borderColor: "#2B78EC",
            borderWidth: 1,
          }}
        >
          <SearchBarInput onEnter={setNewSearchedVerb(dispatch)} />
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
        <StadiumButton
          name="Practice"
          onClick={() =>
            navigateToTraining(
              state,
              navigation,
              getTenseFromActiveIndex(state.activeIndex)
            )
          }
          disabled={state.tableStatus == "Loading"}
          backgroundColor={Colors.purple}
        />
        <StadiumButton
          name="Lesson"
          onClick={() =>
            navigateToPattern(navigation, "PatternLesson", {
              pattern: state.tableData.pattern.pattern,
              name: state.tableData.pattern.name,
              aspects: state.tableData.pattern.aspects,
              infinitive_form: state.tableData.pattern.infinitive_form,
              pattern_id: state.tableData.pattern._id,
              tense: getTenseFromActiveIndex(state.activeIndex),
            })
          }
          disabled={state.tableStatus == "Loading"}
          backgroundColor="#DCAB43"
        />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
