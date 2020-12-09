import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import SettingsHome from '../StackScreens/SettingsScreens/SettingsHome'
import { createStackNavigator } from '@react-navigation/stack';
import styleHeaderFor from '../Actions/headerOptions';

const Stack = createStackNavigator();

const SettingsScreen = props => {
    return (
        <Stack.Navigator initialRouteName="SettingsHome">
            <Stack.Screen options={{ 
                    headerShown: false,
                    
                }}  name="SettingsHome" component={SettingsHome} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

  });

export default SettingsScreen;