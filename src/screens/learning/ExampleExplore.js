import React, { useEffect, useReducer } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StadiumButton } from "../../components/atoms";
import { StudySection } from "../../components/templates";
import {
  conjugationTableReducer,
  initialState,
  setNewExampleVerb,
  navigateToTraining
} from "../../services";
import { Typography, Colors, Spacing, exploreStyles, Sizing } from "../../styles";

const ExampleExploreScreen = ({ route, navigation }) => {
  const { pattern_id, subtopic } = route.params;
  const [state, dispatch] = useReducer(conjugationTableReducer, initialState);

  useEffect(() => {
    setNewExampleVerb(pattern_id, dispatch);
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container}>
      <View style={styles.top}>
        <Text style={styles.instructions}>
          Use this to review then move on to try out your skills
        </Text>
      </View>
      <View style={styles.main}>
        <StudySection
          tableStatus={state.tableStatus}
          tableData={state.tableData}
          subtopic={subtopic}
          definedTranslation={state.tableData.translation}
        />
      </View>
      <View style={styles.bottom}>
        <StadiumButton
          name="Practice"
          onClick={() =>
            navigateToTraining(state, navigation, subtopic.toUpperCase())
          }
          disabled={state.tableStatus == "Loading"}
          backgroundColor={Colors.green}
        />
        <StadiumButton
          name="Another"
          onClick={() => {
            dispatch({ type: "loadTableData" });
            setNewExampleVerb(pattern_id, dispatch);
          }}
          backgroundColor={Colors.skyBlue}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    marginVertical: 5,
    ...Spacing.centerCenter,
  },
  bottom: {
    flex: 1,
    width: Sizing.SCREEN_WIDTH,
    ...Spacing.row,
    ...Spacing.justifyAround,
    paddingHorizontal: 10,
  },
  main: {
    flex: 6,
    width: Sizing.SCREEN_WIDTH,
    ...Spacing.centerCenter,
  },
  instructions: {
    ...Typography.size14,
    textAlign: "center",
    ...Typography.regular,
  },
});

export default ExampleExploreScreen;
