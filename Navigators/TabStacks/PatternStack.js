import React from 'react';
import styleHeaderFor from '../../Actions/headerOptions';
import { createStackNavigator } from '@react-navigation/stack';
import LessonSelection from '../../Screens/Learning/LessonSelection.js'
import PatternLesson from '../../Screens/Learning/Lessons/PatternLesson.js'
import ExampleExplore from '../../Screens/Learning/ExampleExplore.js'

const Stack = createStackNavigator();

const PatternStack = () => {
    return (
            <Stack.Navigator initialRouteName="LessonSelection">
                <Stack.Screen options={styleHeaderFor("Learn")} name="LessonSelection" component={LessonSelection} />
                <Stack.Screen options={styleHeaderFor('Learn a Pattern')} name="PatternLesson" component={PatternLesson} />
                <Stack.Screen options={styleHeaderFor('Pattern Conjugations')} name="ExampleExplore" component={ExampleExplore} />
            </Stack.Navigator>
    )  
}

export default PatternStack;