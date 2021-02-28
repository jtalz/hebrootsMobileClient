import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { normalize } from "../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import SmallYellowButton from "../Buttons/SmallYellowButton";
import { Colors, Spacing } from "../../styles/index";
import Conjugation from "../Conjugation";

const IncorrectAnswerModal = ({ visibility, onClick, answer }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      //onShow={}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Image
          style={{
            height: SCREEN_WIDTH / 3,
            bottom: (SCREEN_WIDTH / 2)+ 20,
            position: "absolute",
            zIndex: 1,
          }}
          source={require("../../assets/sadface.png")}
          resizeMode="contain"
        />
          <Text style={styles.modalText}>Better luck next time</Text>
          <Text style={styles.modalText}>The correct answer was:</Text>
          <Text style={styles.modalText}>{answer}</Text>
          <SmallYellowButton
            size={{ width: SCREEN_WIDTH - 170, marginVertical: 10 }}
            name="Continue"
            onClick={onClick}
            backgroundColor={Colors.red}
          />
        </View>
      </View>
    </Modal>
  );
};

export default IncorrectAnswerModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingTop: SCREEN_HEIGHT / 16,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: normalize(18),
    color: Colors.magenta,
    marginVertical: 5
  },
});
