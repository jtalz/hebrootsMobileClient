import React, { useEffect, useReducer } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StadiumButton } from "../../components/atoms";
import { StudySection } from "../../components/templates";
import {
  conjugationTableReducer,
  setNewExampleVerb,
  navigateToTraining,
  conjugationTableInitialState,
} from "../../services";
import {
  Typography,
  Colors,
  Spacing,
  exploreStyles,
  Sizing,
} from "../../styles";

const ExampleExploreScreen = ({ route, navigation }) => {
  const { pattern_id, subtopic } = route.params;
  const [state, dispatch] = useReducer(
    conjugationTableReducer,
    conjugationTableInitialState
  );

  useEffect(() => {
    setNewExampleVerb(pattern_id, dispatch);
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container}>
      <View style={styles.top}>
        <Text style={styles.instructions}>
          Remember that the letters in{" "}
          <Text style={{ color: Colors.magenta, ...Typography.regular }}>
            magenta   </Text>{" "}
          are interchangable while the letters in{" "}
          <Text style={{ color: Colors.green, ...Typography.regular }}>
            green</Text>{" "}
          will almost always stay the same.
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
    flex: 2,
    paddingHorizontal: 10,
    ...Spacing.centerCenter
  },
  bottom: {
    flex: 1,
    width: "90%",
    ...Spacing.row,
    ...Spacing.justifyAround,
    paddingHorizontal: 10,
  },
  main: {
    flex: 7,
    width: Sizing.SCREEN_WIDTH,
    ...Spacing.centerCenter,
  },
  instructions: {
    ...Typography.size14,
    textAlign: "center",
    ...Typography.light,
  },
});

export default ExampleExploreScreen;
