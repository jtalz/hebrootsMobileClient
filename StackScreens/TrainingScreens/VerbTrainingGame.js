import React, { useState, useRef } from "react";
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as Animatable from "react-native-animatable";
import SmallYellowButton from "../../Components/Buttons/SmallYellowButton.js";
import checkAnswer from "../../Actions/CheckAnswer.js";

const initialState = {
  x: 0,
  y: 0,
  prefill: 0,
  fill: 0,
  value: "",
  textInputStatus: true,
  modalVisible: false
}

const VerbTrainingGame = ({ route, navigation }) => {
  const { title, tenses, verbSet } = route.params;
  const [index, setIndex] = useState(initialState);
  let subVerbSet = verbSet[index["x"]].data;
  let tense = verbSet[index["x"]].tense;
  let conj = verbSet[index["x"]].data[index["y"]];
  let possession = conj["possession"]["possession"];
  let consCodes = conj["consonantCodes"];
  let modalVisible = index["modalVisible"];
  let vocalizedInflection = conj["conjugation"];
  let progressInc = 100 / (subVerbSet.length * verbSet.length);

  const handleChange = (text) => {
    setIndex({ ...index, value: text });
    if (checkAnswer(text, consCodes)) {
      handleCorrectAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    let incrementer;
    if(index.y < subVerbSet.length - 1){
      incrementer = "possession"
      console.log('incrementing y')
    }else if(index.x < verbSet.length - 1){
      incrementer = "tense"
      console.log('incrementing x')
    }else 
      incrementer = "finished"
    incrementVerb(incrementer)
    //add animation...?
  };

  const animatableView = useRef(null);
  const gameInput = useRef(null);

  const incrementVerb = (incrementer) => {
    if (animatableView) {
      setIndex({
        ...index,
        value: vocalizedInflection,
        textInputStatus: false,
      });
      animatableView.current?.pulse(1000).then((endState) => {
        if (endState.finished) {
          switch(incrementer){
            case "possession" : setIndex({
                ...index,
                y: index.y + 1,
                prefill: index.fill,
                fill: index.fill + progressInc,
                value: "",
                textInputStatus: true,
              });break;
            case "tense" : setIndex({
              x: index.x + 1,
              y: 0,
              prefill: index.fill,
              fill: index.fill + progressInc,
              value: "",
              textInputStatus: true,
              modalVisible: false,
            });break;
            case "finished" : setIndex({
              ...index,
              fill: 100,
              modalVisible: true,
            });break;
            default : setIndex({...index});break;
          }
          gameInput.current?.focus();
        }
      });
    }
  };

  const giveHint = () => {
    handleCorrectAnswer();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>יפה מאוד!</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {setIndex(initialState);}}
            >
              <Text style={styles.textStyle}>Try again</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.textStyle}>Try again with other tense</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                navigation.navigate("UserTrainingMap");
              }}
            >
              <Text style={styles.textStyle}>Return to Training screen</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.upperContainer}>
        <Animatable.Image
          animation="fadeIn"
          delay={1000}
          iterationCount={1}
          direction="alternate"
          style={{ width: 135, height: 125 }}
          source={{
            uri:
              "https://user-images.githubusercontent.com/31594943/89093398-b874cd00-d3c2-11ea-8193-b95631208ba1.png",
          }}
        />
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            {tenses.map((tense) => tense + " ")}
          </Text>
          <Text style={styles.instructions}>
            enter the correct form of the verb as fast as possible!
          </Text>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUp"
        direction="alternate"
        style={styles.gameContainer}
      >
        <AnimatedCircularProgress
          size={80}
          width={10}
          fill={index.fill}
          prefill={index.prefill}
          tintColor="#1CDE52"
          backgroundColor="#3d5875"
          style={{ position: "absolute", left: "10%", top: "30%" }}
          //arcSweepAngle = {280}
          rotation={180}
        />
        {/* <View style={styles.rowLong}>
          <Text style={{ fontSize: 14, marginRight: 5 }}>00:00</Text>
          <MaterialCommunityIcons name="speedometer" size={24} color="black" />
        </View> */}
        <View style={styles.rowLong}>
          <Text style={{ fontSize: 30 }}>{title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 16 }}>{tense}</Text>
          <Feather name="clock" size={20} color="black" />
        </View>
        <View style={styles.row}>
          <Text>{possession}</Text>
          <Ionicons name="md-person" size={24} color="black" />
        </View>
        <Animatable.View ref={animatableView} style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={(text) => handleChange(text)}
            underlineColorAndroid="transparent"
            allowFontScaling={false}
            value={index.value}
            editable={index.textInputStatus}
            autoFocus={true}
            ref={gameInput}
          />
        </Animatable.View>
      </Animatable.View>
      <View style={{ flex: 2, alignItems: "center", marginTop: 10 }}>
        <SmallYellowButton name="Need Help" onClick={giveHint} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
  },
  input: {
    width: "50%",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 2,
    borderBottomWidth: 2,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Arial",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 60,
    flex: 1,
  },
  rowLong: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 70,
    flex: 1,
  },
  upperContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "5%",
    flexDirection: "row",
  },
  instructionsContainer: {
    width: "50%",
  },
  gameContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  instructions: {
    fontFamily: "Bodoni 72",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 24,
    alignItems: "center",
    textAlign: "center",
    color: "#7A7A7A",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default VerbTrainingGame;
