import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsHomeScreen } from '../../screens';

const Stack = createStackNavigator();

const SettingsStack = props => {
    return (
        <Stack.Navigator initialRouteName="SettingsHome">
            <Stack.Screen options={{ 
                    headerShown: false,
                }}  name="SettingsHome" component={SettingsHomeScreen} />
        </Stack.Navigator>
    )
}

export default SettingsStack;