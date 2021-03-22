import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../../screens';

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ 
                    headerShown: false,
                }}  />
        </Stack.Navigator>
    )
}

export default AuthNavigator;
