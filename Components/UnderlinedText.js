import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../Actions/ScreenDimensions';
import {normalize} from '../Actions/Normalize'
const UnderlinedText = (props) => {
    const [showBubble, setShowBubble] = useState(props.bubbleVisible)

    return ( 
        <TouchableOpacity onPress={()=> setShowBubble(!showBubble)}>
            <View
            style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "blue",
            borderRadius: 1,
            borderStyle: "dotted",
            zIndex: 0,
            }}
        >
        <View
            style={{
            position: "absolute",
            left: -1,
            top: -1,
            width: "100%",
            height: 1,
            backgroundColor: "white",
            zIndex: 1,
            }}
        />
        <View
            style={{
            position: "absolute",
            left: -1,
            top: -1,
            width: 2,
            height: "100%",
            backgroundColor: "white",
            zIndex: 1,
            }}
        />
        <View
            style={{
            position: "absolute",
            right: -1,
            top: -1,
            width: 2,
            height: "100%",
            backgroundColor: "white",
            zIndex: 1,
            }}
        />
        
            {props.children}
        </View> 
        <Modal 
            visible={showBubble}
            transparent={true}
            animationType="fade"
            >
                
                <View style={styles.centeredView}><TouchableWithoutFeedback onPress={()=>setShowBubble(!showBubble)}>
                    <View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', width: SCREEN_WIDTH}}>
                <View style={styles.modalView}>
            <Text style={{fontFamily: 'Rubik_300Light', fontSize: normalize(15), marginVertical: 5}}>{props.word}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize: normalize(14), marginVertical: 5}}>{props.translation} </Text>
             
            <Text style={{fontFamily:'Nunito_300Light'}}>Tap to close</Text> 
            
            </View></View></TouchableWithoutFeedback></View>
        </Modal>
    </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    bubble: {
        width: 200,
        height: 100,
        backgroundColor: 'grey'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,.5)',
        opacity:1,
      },
      modalView: {
        margin: SCREEN_WIDTH/8,
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
})

 
export default UnderlinedText;