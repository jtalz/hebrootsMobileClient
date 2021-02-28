import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import { Colors, Sizing, Spacing, Typography } from "../../styles/index";
import SmallYellowButton from "../Buttons/SmallYellowButton";

const CorrectAnswerModal = ({ visibility, onClick }) => {
  const randomPositiveWord = () => {
    const words = [
      "Great Job!",
      "That was awesome!",
      "You are doing great!",
      "That was right!",
      "You're on a roll!",
      "Have you seen this before?",
      "That's correct, go you!",
      "Yes! Correct!",
    ];
    const r = Math.floor(Math.random() * words.length);
    return words[r];
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        
        <View style={styles.modalView}>
        <Image
          style={styles.smileyFace}
          source={require("../../assets/smileyface.png")}
          resizeMode="contain"
        />
          <Text style={styles.modalText}>{randomPositiveWord()}</Text>
          <Text style={styles.modalText}>Keep going</Text>
          <SmallYellowButton
            size={{ width: SCREEN_WIDTH - 170, marginVertical: 10 }}
            name="Continue"
            onClick={onClick}
            backgroundColor={Colors.green}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CorrectAnswerModal;

const styles = StyleSheet.create({
  smileyFace: {
    height: SCREEN_WIDTH / 3,
    bottom: (SCREEN_WIDTH/2)+20,
    position: "absolute",
    zIndex: 1,
  },
  centeredView: {
    ...Sizing.f1,
    ...Spacing.centerCenter,
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,.7)",
  },
  modalView: {
    ...Spacing.alignCenter,
    ...Spacing.justifyCenter,
    ...Colors.bgWhite,
    ...Spacing.m20,
    height: SCREEN_WIDTH / 1.5,
    width: SCREEN_WIDTH / 1.2,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: SCREEN_HEIGHT/16
  },
  modalText: {
    ...Typography.textAlignCenter,
    ...Typography.regular,
    ...Typography.size18,
    ...Colors.txtMagenta,
    marginVertical: 5
  },
});