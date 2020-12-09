import React from 'react';
import styleHeaderFor from '../Actions/headerOptions';
import { createStackNavigator } from '@react-navigation/stack';
import SelectAPattern from '../StackScreens/PatternLearningScreens/SelectAPattern.js'
import LearnAPattern from '../StackScreens/PatternLearningScreens/LearnAPattern.js'
import RandomVerbSpawn from '../StackScreens/PatternLearningScreens/RandomVerbSpawn.js'
import SelectTrainingType from '../StackScreens/TrainingScreens/SelectTrainingType.js'

const Stack = createStackNavigator();

const PatternStack = () => {
    return (
            <Stack.Navigator initialRouteName="SelectAPattern">
                <Stack.Screen options={styleHeaderFor('Select a Pattern')} name="SelectAPattern" component={SelectAPattern} />
                <Stack.Screen options={styleHeaderFor('Learn a Pattern')} name="LearnAPattern" component={LearnAPattern} />
                <Stack.Screen options={styleHeaderFor('Pattern Conjugations')} name="RandomVerbSpawn" component={RandomVerbSpawn} />
                <Stack.Screen options={styleHeaderFor('Training Selection')} name="SelectTrainingType" component={SelectTrainingType} />
            </Stack.Navigator>
    )  
}

export default PatternStack;