import React from 'react';
import styleHeaderFor from '../../Actions/headerOptions';
import { createStackNavigator } from '@react-navigation/stack';
import LessonSelection from '../../Screens/Learning/LessonSelection.js'
import PatternLesson from '../../Screens/Learning/PatternLesson.js'
import ExampleExplore from '../../Screens/Learning/ExampleExplore.js'
import ExerciseSelection from '../../Screens/Training/ExerciseSelection.js'

const Stack = createStackNavigator();

const PatternStack = () => {
    return (
            <Stack.Navigator initialRouteName="LessonSelection">
                <Stack.Screen options={styleHeaderFor("let's learn something")} name="LessonSelection" component={LessonSelection} />
                <Stack.Screen options={styleHeaderFor('Learn a Pattern')} name="PatternLesson" component={PatternLesson} />
                <Stack.Screen options={styleHeaderFor('Pattern Conjugations')} name="ExampleExplore" component={ExampleExplore} />
                <Stack.Screen options={styleHeaderFor('Training Selection')} name="ExerciseSelection" component={ExerciseSelection} />
            </Stack.Navigator>
    )  
}

export default PatternStack;