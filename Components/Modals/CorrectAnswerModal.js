import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { normalize } from "../../Actions/Normalize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Actions/ScreenDimensions";
import SmallYellowButton from "../Buttons/SmallYellowButton";

const CorrectAnswerModal = ({visibility, onClick}) => {

  const randomPositiveWord = () => {
    const words = 
    ['Great Job!', 
    'That was awesome!', 
    'You are doing great!', 
    'That was right!', 
    "You're on a roll!",
    'Have you seen this before?',
    "That's correct, go you!",
    'Yes! Correct!'
    ]
    const r = Math.floor(Math.random()*words.length)
    return words[r]
  }

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
      <Image
            style={{
              height: SCREEN_WIDTH/2,
              top: SCREEN_HEIGHT/6,
              position: 'absolute',
              zIndex: 1
            }}
            source={require('../../assets/smileyface.png')}
            resizeMode='contain'

          />
        <View style={styles.modalView}>
          
          <View style={{flex: .8, justifyContent: 'space-around', alignItems: 'center'}}>
          <Text style={styles.modalText}>{randomPositiveWord()}</Text>
          <Text style={styles.modalText}>Keep going</Text>
          <SmallYellowButton 
              size={{width:SCREEN_WIDTH - 170}}
              name="Continue"
              onClick={onClick}
              
              backgroundColor='#73D413'
            />
        </View>
        </View>
      </View>
    </Modal>
  );
};

export default CorrectAnswerModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(255,255,255,.7)'
      },
      primaryBtn: {
        backgroundColor: '#2196F3',
        borderWidth: 0
      },
      secondaryBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#2196F3'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        height: SCREEN_WIDTH/1.5,
        width: SCREEN_WIDTH/1.2,
        alignItems: 'center',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'flex-end'
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Poppins_400Regular'
      },
      modalText: {
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(18),
        color: '#48161D'
      },
  });