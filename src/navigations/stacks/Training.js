import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { GameScreen, QuickPlayScreen } from '../../screens';
import styleHeaderFor from './screenHeaderStyle';

const Stack = createStackNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QuickPlay';
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
            <Stack.Navigator initialRouteName="QuickPlay">
                <Stack.Screen options={styleHeaderFor('Quick Play')} name="QuickPlay" component={QuickPlayScreen} />
                <Stack.Screen options={{ 
                    headerShown: false,
                }} 
                name="MultipleChoice"
                component={GameScreen}
                />


            </Stack.Navigator>
    )  
}

export default TrainingStack;