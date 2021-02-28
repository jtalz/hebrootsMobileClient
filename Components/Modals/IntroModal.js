import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { normalize } from "../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import { Colors, Sizing, Spacing, Typography } from "../../styles";

const IntroModal = ({ visibility, goFn }) => {
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
            style={{
              width: 100,
              height: 90,
            }}
            source={{
              uri:
                "https://user-images.githubusercontent.com/31594943/89093398-b874cd00-d3c2-11ea-8193-b95631208ba1.png",
            }}
          />
          <ScrollView>
          <Text style={styles.modalText}>
            Hello and welcome to hebroots! I'm going to explain a little bit about what we do here. 
            {"\n\n"}Firstly, welcome aboard! The purpose of this application is to help you improve at Hebrew verb conjugations.
            Okay so let's see how.
            {"\n\n"}The Explore page lets you search up almost any verb in the dictionary and 
            in return you'll see its Hebrew verb conjugations for the Past, Present, and Future.
            {"\n\n"}The Quick Play screen will send you straight to our special training arena so you can
            go ahead and work on your verb conjugating skills!
            {"\n\n"}The Learn screen offers specially tailored lessons in case you want to review or even learn for the first time
            about one of the 7 binya'anim
            {"\n\n"}Finally, in the Settings screen you'll find a place to change a couple of things around 
            and also check out your progress. 
            {"\n\n"}Welcome aboard! And I'd love to hear your feedback.
          </Text>
          </ScrollView>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  ...styles.primaryBtn
                }}
                onPress={goFn}
              >
                <Text
                  style={{
                    ...styles.textStyle,
                    color: "white"
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IntroModal;

const styles = StyleSheet.create({
  centeredView: {
    ...Sizing.f1,
    ...Spacing.centerCenter,
    backgroundColor: "rgba(255,255,255,.7)",
  },
  primaryBtn: {
    backgroundColor: Colors.green,
    borderWidth: 0,
  },
  secondaryBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  modalView: {
    ...Spacing.alignCenter,
    ...Spacing.justifyBtwn,
    ...Colors.bgWhite,
    ...Spacing.m20,
    height: SCREEN_HEIGHT / 1.5,
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
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    width: SCREEN_WIDTH / 2,

  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: normalize(12),
  },
  modalText: {
    textAlign: 'left',
    ...Typography.regular,
    ...Typography.size14,
    ...Colors.txtMagenta,
    ...Spacing.p5
  },
});
