import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const UnderlinedText = (props) => {
    const [showBubble, setShowBubble] = useState(props.bubbleVisible)

    return ( 
        <TouchableWithoutFeedback onPress={()=> setShowBubble(!showBubble)}>
            <View
            style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
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
            animationType="slide"
            >
                
                <View style={styles.centeredView}><TouchableWithoutFeedback onPress={()=>setShowBubble(!showBubble)}>
                <View style={styles.modalView}>

            <Text>{props.translation} </Text>
             
            <Text>Tap to close</Text> 
            
            </View></TouchableWithoutFeedback></View>
        </Modal>
    </TouchableWithoutFeedback>
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
})

 
export default UnderlinedText;