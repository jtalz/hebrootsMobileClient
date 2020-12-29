import React from 'react';
import Explore from '../../Screens/Explore.js'
import ExerciseSelection from '../../Screens/Training/ExerciseSelection.js'
import { createStackNavigator } from '@react-navigation/stack';
import styleHeaderFor from '../../Actions/headerOptions';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator initialRouteName="Explore">
            <Stack.Screen options={styleHeaderFor('Explore')} name="Explore" component={Explore} />
            <Stack.Screen options={styleHeaderFor('Training Selection')} name="ExerciseSelection" component={ExerciseSelection} />
        </Stack.Navigator>
    )
}

export default SearchStack;