import React from "react";
import { Ionicons } from "@expo/vector-icons";

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
      }}
    >
        {children}
    </Tab.Navigator>
  );
};

export default HebrootsTabNav;