import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors, Sizing, Spacing, Typography } from "../../../styles";

const HebrootsModal = ({ message, buttons, visibility }) => {
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
              marginTop: -15,
              marginLeft: -30,
              marginRight: 5,
            }}
            source={{
              uri:
                "https://user-images.githubusercontent.com/31594943/89093398-b874cd00-d3c2-11ea-8193-b95631208ba1.png",
            }}
          />
          <Text style={styles.modalText}>{message}</Text>
          {buttons.map(({ name, callback, btnType }) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  ...(btnType == "primary"
                    ? styles.primaryBtn
                    : styles.secondaryBtn),
                }}
                onPress={callback}
                key={name}
              >
                <Text
                  style={{
                    ...styles.textStyle,
                    color: btnType == "primary" ? "white" : "#2196F3",
                  }}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default HebrootsModal;

const styles = StyleSheet.create({
  centeredView: {
    ...Sizing.f1,
    ...Spacing.centerCenter,
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,.7)",
  },
  primaryBtn: {
    backgroundColor: "#2196F3",
    borderWidth: 0,
  },
  secondaryBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  modalView: {
    ...Spacing.alignCenter,
    ...Spacing.justifyAround,
    ...Colors.bgWhite,
    ...Spacing.m20,
    height: Sizing.SCREEN_WIDTH / 1.5,
    width: Sizing.SCREEN_WIDTH / 1.2,
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
    marginVertical: 5,
    width: Sizing.SCREEN_WIDTH / 2,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    ...Typography.size12,
  },
  modalText: {
    ...Typography.textAlignCenter,
    ...Typography.light,
    ...Typography.size14,
    ...Colors.txtMagenta,
    ...Spacing.p5,
  },
});
