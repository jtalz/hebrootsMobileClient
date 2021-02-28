import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import {
  requestPracticeVerbs,
  requestVerbFromValue,
} from "../../Actions/APIRequests";
import getRandomImg from "../../Actions/GetMethods/GetRandomImage";
import { normalize } from "../../Actions/Normalize";
import organizeVerbsByType from "../../Actions/ObjectManipulations/OrganizePracticeVerbs";
import { SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import RoundCustomButton from "../../Components/Buttons/RoundCustomButton";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { Colors, Typography } from "../../styles";
import fonts from "../../styles/fontStyle";

const UserProgress = ({ route, navigation }) => {
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

  const PracticeTabs = ({ title, verbs, tense }) => {
    return (
      <View>
        <PracticeTab title={title} tense={tense} verbs={verbs} />
        {/* <PracticeTab title={title} tense={"Present"} verbs={verbs} />
        <PracticeTab title={title} tense={"Future"} verbs={verbs} /> */}
      </View>
    );
  };

  const quickPlay = (verb, tense) => {
    setState({ ...state, loading: true });
    requestVerbFromValue(verb.infinitive).then((res) => {
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

  class QuickPlayButton extends Component {
    shouldComponentUpdate(nextProps) {
      if (nextProps.name !== this.props.name) {
        return true;
      } else {
        return false;
      }
    }
    render() {
      return (
        <View>
          <RoundCustomButton
            name={this.props.name}
            translation={this.props.translation}
            imgUrl={this.props.imgUrl}
            onPress={this.props.onPress}
          />
        </View>
      );
    }
  }

  const PracticeTab = ({ tense, title, verbs }) => {
    const animatedHeight = new Animated.Value(200);
    const [isOpen, setOpen] = useState(true);

    const renderQuickPlayButton = ({ item }) => {
      return (
        <QuickPlayButton
          name={item.infinitive}
          translation={item.translation}
          imgUrl={getRandomImg()}
          onPress={() => quickPlay(item, tense)}
        />
      );
    };

    const openPracticeTab = () => {
      Animated.timing(animatedHeight, {
        toValue: 200,
        useNativeDriver: false,
      }).start(() => {
        setOpen(!isOpen);
      });
    };

    const closePracticeTab = () => {
      Animated.timing(animatedHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start(() => {
        setOpen(!isOpen);
      });
    };

    const TabButton = ({ title, tense, isOpen }) => {
      return (
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) =>
            nativeEvent.state === State.ACTIVE
              ? isOpen
                ? closePracticeTab()
                : openPracticeTab()
              : null
          }
          maxDurationMs={1000}
        >
          <View
            style={{
              height: SCREEN_HEIGHT / 15,
              padding: 5,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderColor: "#4294DB",
              borderWidth: 1,
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: normalize(14),
                color: "#4294DB",
                textAlign: 'right'
              }}
            >
              {title}{/*  {tense} Tense */}
            </Text>
            <View style={{position: 'absolute', right: 15}}>
            <AntDesign name={isOpen ? 'down' : 'up'} color={Colors.skyBlue} size={20} />
            </View>
          </View>
        </TapGestureHandler>
      );
    };
    return (
      <View style={{ flexDirection: "column" }}>
        <TabButton isOpen={isOpen} title={title} tense={tense} />
        <Animated.View
          style={[
            styles.practiceTab,
            {
              height: animatedHeight,
            },
          ]}
        >
          <FlatList
            data={verbs}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            horizontal={true}
            renderItem={renderQuickPlayButton}
            keyExtractor={(item) => item._id}
            scrollEnabled={true}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={state.loading} transparent={true} animationType={"fade"}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={"large"} />
          </View>
        </View>
      </Modal>
      <ScrollView>
        {state.organizedPracticeObjects ? (
          <>
            <Text
              style={{
                ...Typography.regular,
                ...Typography.size18,
                ...Colors.txtMagenta,
                ...Typography.taCenter,
                marginVertical: 25,
              }}
            >
              (Past Tense) עבר
            </Text>
            {Object.keys(state.organizedPracticeObjects).map((key, index) => {
              return (
                <PracticeTab
                  key={index}
                  title={`${state.organizedPracticeObjects[key].name_he} (${state.organizedPracticeObjects[key].name})`}
                  verbs={state.organizedPracticeObjects[key].verbs}
                  tense={"Past"}
                />
              );
            })}
            <Text
              style={{
                ...Typography.regular,
                ...Typography.size18,
                ...Colors.txtMagenta,
                ...Typography.taCenter,
                marginVertical: 25,
              }}
            >
              (Present Tense) הווה
            </Text>
            {Object.keys(state.organizedPracticeObjects).map((key, index) => {
              return (
                <PracticeTab
                  key={index}
                  title={`${state.organizedPracticeObjects[key].name_he} (${state.organizedPracticeObjects[key].name})`}
                  verbs={state.organizedPracticeObjects[key].verbs}
                  tense={"Present"}
                />
              );
            })}
            <Text
              style={{
                ...Typography.regular,
                ...Typography.size18,
                ...Colors.txtMagenta,
                ...Typography.taCenter,
                marginVertical: 25,
              }}
            >
              (Future Tense) עתיד
            </Text>
            {Object.keys(state.organizedPracticeObjects).map((key, index) => {
              return (
                <PracticeTab
                  key={index}
                  title={`${state.organizedPracticeObjects[key].name_he} (${state.organizedPracticeObjects[key].name})`}
                  verbs={state.organizedPracticeObjects[key].verbs}
                  tense={"Future"}
                />
              );
            })}
          </>
        ) : (
          <LoadingIndicator />
        )}
      </ScrollView>
    </View>
  );
};
//<Header><SearchBar onEnter={() => onSearch} /></Header>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  intro: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10,
  },
  listItem: {
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  practiceTab: {
    height: 10,
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

export default UserProgress;
