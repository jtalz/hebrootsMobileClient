import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { SCREEN_WIDTH } from '../Actions/ScreenDimensions';
import { Colors, Spacing, Typography } from '../styles';

const LoginInput = ({name, secured, icon, handleChange}) => {
    return ( 
        <View style={styles.inputBubble}>
            <Fontisto name={icon} size={20} color={Colors.white} />
            <TextInput
              style={styles.textBox}
              placeholder={`${name.split("").map(c=>c=='_'?' ':c).join('')}...`}
              secureTextEntry={secured}
              placeholderTextColor="rgba(255,255,255,.6)"
              onChangeText={(text) => handleChange(name, text)}
            />
          </View>
     );
}
 
export default LoginInput;

const styles = StyleSheet.create({
    inputBubble: {
      backgroundColor: "rgba(255,255,255,.3)",
      width: SCREEN_WIDTH / 1.5,
      borderRadius: SCREEN_WIDTH,
      ...Spacing.justifyStart,
      ...Spacing.row,
      ...Spacing.alignCenter,
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    textBox: {
      ...Typography.size12,
      textAlign: "left",
      width: SCREEN_WIDTH / 2,
      padding: 10,
      color: Colors.white,
      ...Typography.light,
    },
})