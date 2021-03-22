import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreScreen } from '../../screens';
import styleHeaderFor from './screenHeaderStyle';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator initialRouteName="Explore">
            <Stack.Screen options={styleHeaderFor('Explore')} name="Explore" component={ExploreScreen} />
        </Stack.Navigator>
    )
}

export default SearchStack;