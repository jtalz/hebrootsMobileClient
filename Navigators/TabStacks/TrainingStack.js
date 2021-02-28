import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProgress from '../../Screens/Training/UserProgress.js'
import styleHeaderFor from '../../Actions/headerOptions';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Combo from '../../Screens/Training/Exercises/Combo.js';
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
                <Stack.Screen options={styleHeaderFor('Quick Play')} name="UserProgress" component={UserProgress} />
                <Stack.Screen options={{ 
                    headerShown: false,
                    
                }} 
                name="MultipleChoice"
                component={Combo}
                />


            </Stack.Navigator>
    )  
}

export default TrainingStack;