import React from 'react';
import SearchScreen from '../StackScreens/SearchScreen.js'
import SelectTrainingType from '../StackScreens/TrainingScreens/SelectTrainingType.js'
import { createStackNavigator } from '@react-navigation/stack';
import styleHeaderFor from '../Actions/headerOptions';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator initialRouteName="SearchScreen">
            <Stack.Screen options={styleHeaderFor('Explore')} name="SearchScreen" component={SearchScreen} />
            <Stack.Screen options={styleHeaderFor('Training Selection')} name="SelectTrainingType" component={SelectTrainingType} />
        </Stack.Navigator>
    )
}

export default SearchStack;