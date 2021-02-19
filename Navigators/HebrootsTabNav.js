import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";

const HebrootsTabNav = ({ children, Tab }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Explore") {
            iconName = "ios-search";
          } else if (route.name === "Learn") {
            iconName = "ios-school";
          } else if (route.name === "Play") {
            iconName = "ios-flash";
          } else if (route.name === "Settings") {
            iconName = "ios-settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2B78EC",
        inactiveTintColor: "gray",
        showLabel: false,
        /* style: {
          borderTopLeftRadius:21, 
              borderTopRightRadius:21,
              backgroundColor:"#000000",
              position:'absolute',
              bottom: 0,
              padding:10,
              width: SCREEN_WIDTH,
              height: 80,
              zIndex: 8 
        } */
      }}
    >
        {children}
    </Tab.Navigator>
  );
};

export default HebrootsTabNav;