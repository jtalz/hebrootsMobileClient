import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserTrainingMap from '../StackScreens/TrainingScreens/UserTrainingMap.js'
import SelectTrainingType from '../StackScreens/TrainingScreens/SelectTrainingType.js'
//import VerbTrainingGame from '../StackScreens/VerbTrainingGame.js'
import MultiChoiceTraining from '../StackScreens/TrainingScreens/MultiChoiceTraining'
import MatchingTraining from '../StackScreens/TrainingScreens/MatchingTraining'
import styleHeaderFor from '../Actions/headerOptions';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Stack = createStackNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UserTrainingMap';
    if (routeName == 'MultiChoiceTraining'){
        return false;
    }else if(routeName == 'MatchingTraining'){
        return false;
    }else{
        return true;
    }
  }

const TrainingStack = ({navigation, route}) => {
    
    navigation.setOptions({ tabBarVisible: getHeaderTitle(route) })
    return (
            <Stack.Navigator initialRouteName="UserTrainingMap">
                <Stack.Screen options={styleHeaderFor('Progress')} name="UserTrainingMap" component={UserTrainingMap} />
                <Stack.Screen options={styleHeaderFor('Training Selection')} name="SelectTrainingType" component={SelectTrainingType} />
                { // <Stack.Screen options={styleHeaderFor('Training Game')} name="VerbTrainingGame" component={VerbTrainingGame} /> 
                }
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="MultiChoiceTraining"
                component={MultiChoiceTraining}
                />
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="MatchingTraining"
                component={MatchingTraining}
                />
            </Stack.Navigator>
    )  
}

export default TrainingStack;