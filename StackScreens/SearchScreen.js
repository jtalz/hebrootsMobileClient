import React, { useEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../Components/SearchBar.js";
import Card from "../Components/Card";
import SmallYellowButton from "../Components/Buttons/SmallYellowButton";
import {navigateToPattern, navigateToTraining} from "../Actions/NavigateTo";
import Bird from '../Components/Characters/Bird';
import {
  conjugationTableReducer,
  initialState,
  handleResponse
} from '../Actions/Reducers/ConjugationTableReducer';
import { requestVerbFromValue } from "../Actions/APIRequests";
import StudySection from '../Containers/StudySection'

const SearchScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(conjugationTableReducer, initialState);
  
    const handleSearchRequest = async (text) => {
      dispatch({ type: "loadTableData" });
      let searchedVerb = await requestVerbFromValue(text);
      handleResponse(searchedVerb, dispatch);
    }

    useEffect(()=> {
      handleSearchRequest('למד')
    }, [])

  return (
    <View style={styles.container}>
        <View style={styles.searchArea}>
          <Bird 
            size='Small'
            style={{left: 10, bottom: 0}}
            birdType='Standard'
          />
          <Card style={{width: '60%', height: 40, marginLeft: 60}}>
            <SearchBar onEnter={handleSearchRequest} />
          </Card>
        </View>
        <StudySection 
        tableStatus = {state.tableStatus}
        tableData = {state.tableData}
        />
        <View style={styles.btnArea}>
          <SmallYellowButton
            name="Practice Verb"
            onClick={() =>
              navigation.push("SelectTrainingType", { 
                family: state.tableData.family,
                infinitive: state.tableData.infinitive,
                pattern: state.tableData.pattern.pattern,
                noun_phrase: state.tableData.noun_phrase
              })
            }
            disabled={state==null}
          />
          <SmallYellowButton
            name="Learn Binyan"
            onClick={() =>
              navigateToPattern(navigation, "LearnAPattern", {
                pattern: state.tableData.pattern.pattern,
                    name: state.tableData.pattern.name,
                    aspects: state.tableData.pattern.aspects,
                    infinitive_form: state.tableData.pattern.infinitive_form,
                    pattern_id: state.tableData.pattern._id
              })
            }
            disabled={state==null}
          />
        </View>
    </View>
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
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SearchScreen;