import React from "react";
import { MaterialCommunityIcons, Feather, EvilIcons, Octicons } from "@expo/vector-icons";
import { Image } from "react-native";

const HebrootsTabNav = ({ children, Tab }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Explore") {
            iconName = "search";
            return focused ? <Feather name={iconName} size={size} color={color} /> : <EvilIcons name={iconName} size={size+5} color={color} />
          } else if (route.name === "Learn") {
            iconName = "school"
            return focused ? <MaterialCommunityIcons name={iconName} size={size} color={color} />: <Image source={require('../assets/school-outline.png')} resizeMode='contain' style={{width: 25}} />
          } else if (route.name === "Play") {
            iconName = focused ? 'flash' : "flash-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Settings") {
            iconName = "gear";
            return focused ? <Octicons name={iconName} size={size} color={color} />: <EvilIcons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "white",
        showLabel: true,
        style: {
          backgroundColor:"#4294DB",
        }
      }}
    >
        {children}
    </Tab.Navigator>
  );
};

export default HebrootsTabNav;