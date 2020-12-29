import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProgress from '../../Screens/Training/UserProgress.js'
import ExerciseSelection from '../../Screens/Training/ExerciseSelection.js'
import MultipleChoice from '../../Screens/Training/MultipleChoice'
import Matching from '../../Screens/Training/Matching'
import Writing from '../../Screens/Training/Writing'
import styleHeaderFor from '../../Actions/headerOptions';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Stack = createStackNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UserProgress';
    if (routeName == 'MultipleChoice'){
        return false;
    }else if(routeName == 'Matching'){
        return false;
    }else if(routeName == 'Writing'){
        return false;
    }else{
        return true;
    }
  }

const TrainingStack = ({navigation, route}) => {
    
    navigation.setOptions({ tabBarVisible: getHeaderTitle(route) })
    return (
            <Stack.Navigator initialRouteName="UserProgress">
                <Stack.Screen options={styleHeaderFor('Progress')} name="UserProgress" component={UserProgress} />
                <Stack.Screen options={styleHeaderFor('Training Selection')} name="ExerciseSelection" component={ExerciseSelection} />
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="MultipleChoice"
                component={MultipleChoice}
                />
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="Matching"
                component={Matching}
                />
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="Writing"
                component={Writing}
                />
            </Stack.Navigator>
    )  
}

export default TrainingStack;