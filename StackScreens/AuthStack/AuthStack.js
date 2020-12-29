import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
/* import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen'; */

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
{/*         <Stack.Screen name="SignInScreen" component={SignInScreen}/> */}
    </Stack.Navigator>
);

export default AuthStack;