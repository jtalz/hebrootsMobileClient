import React from 'react';
import SettingsHome from '../../Screens/Settings/SettingsHome'
import { createStackNavigator } from '@react-navigation/stack';

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

export default SettingsScreen;