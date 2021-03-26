import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ExampleExploreScreen,
  LessonSelectionScreen,
  PatternLessonScreen,
} from "../../screens";
import styleHeaderFor from "./screenHeaderStyle";

const Stack = createStackNavigator();

const PatternStack = () => {
  return (
    <Stack.Navigator initialRouteName="LessonSelection">
      <Stack.Screen
        options={styleHeaderFor("Learn")}
        name="LessonSelection"
        component={LessonSelectionScreen}
      />
      <Stack.Screen
        options={styleHeaderFor("Learn a Pattern")}
        name="PatternLesson"
        component={PatternLessonScreen}
      />
      <Stack.Screen
        options={styleHeaderFor("Examples")}
        name="ExampleExplore"
        component={ExampleExploreScreen}
      />
    </Stack.Navigator>
  );
};

export default PatternStack;
