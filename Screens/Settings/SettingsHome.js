import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import DashedCircle from "../../Components/DashedCircle";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import check_for_token from "../../Actions/Authentication/check_for_token";
import SETTINGS_STATIC from "../../Constants/SETTINGS_STATIC";
import { requestUserSettings } from "../../Actions/APIRequests";
import AuthContext from "../../Actions/context/AuthContext";
import SmallYellowButton from "../../Components/Buttons/SmallYellowButton";
import fonts from "../../styles/fontStyle";
import { normalize } from "../../Actions/Normalize";

const SettingsHome = (props) => {
  const [settingsOptions, setSettingsOptions] = useState(null);
  const { signOut, signInAgain } = React.useContext(AuthContext);

  useEffect(() => {
    //const onLoad = () => {
      getDynamicSettings()
        .then((userProfile) => {
          return {
            email: userProfile.email,
            firstName: userProfile.firstName,
            options: [userProfile.options, ...SETTINGS_STATIC],
          };
        })
        .then(USER_SETTINGS => setSettingsOptions(USER_SETTINGS));

      /* const USER_SETTINGS = {
        email: userProfile.email,
        firstName: userProfile.firstName,
        options: [userProfile.options, ...SETTINGS_STATIC],
      };
      setSettingsOptions(USER_SETTINGS); */
    //};
    //onLoad();
  }, []);

  const getDynamicSettings = async () => {
    //check if user is logged in then return appropriate settings
    const token = await check_for_token();
    if (token !== undefined) {
      const customUserSettings = await requestUserSettings(token, signOut);
      return customUserSettings;
    } else {
      return {
        firstName: "",
        email: "",
        options: {
          name: "My Account",
          items: [
            {
              name: "Sign in/Register",
              type: "pressable",
              onPress: signInAgain,
            },
          ],
        },
      };
    }
  };

  const renderOption = (option) => {
    if (option.type == "read-only") {
      return (
        <View style={{ ...styles.optionRow }}>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: normalize(12) }}>
            {option.name}
          </Text>
          <Text style={{ color: "#4294DB" }}>{option.status}</Text>
        </View>
      );
    } else if (option.type == "pressable") {
      return (
        <TouchableOpacity
          style={{ ...styles.optionRow }}
          onPress={option.onPress}
        >
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: normalize(12) }}>
            {option.name}
          </Text>
          {option.status !== undefined ? (
            <Text style={{ color: "#4294DB" }}>{option.status}</Text>
          ) : null}
        </TouchableOpacity>
      );
    } else if (option.type == "toggle") {
      return (
        <View style={{ ...styles.optionRow }}>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: normalize(12) }}>
            {option.name}
          </Text>
          <Switch
          /* trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e" */
          //onValueChange={toggleSwitch}
          //value={option.status}
          />
        </View>
      );
    } else {
      return <View style={{ ...styles.optionRow }}></View>;
    }
  };

  const settingsGroup = ({ item }) => {
    return (
      <View style={{ marginVertical: 0 }}>
        <View
          style={{
            paddingHorizontal: SCREEN_WIDTH / 15,
            height: SCREEN_HEIGHT / 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text>{item.name}</Text>
        </View>
        {item.items.map((subItem) => {
          //console.log(subItem)
          return (
            <View key={subItem.name}>
              {renderOption(subItem)}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: "#f2f2f2"}}>
      {settingsOptions == null ? (
        <View
          style={{
            height: SCREEN_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          renderItem={settingsGroup}
          data={settingsOptions.options}
          contentContainerStyle={{}}
          ListHeaderComponent={
            <View style={{ ...styles.header }}>
              <View style={{flex: 4, backgroundColor: '#4294DB', width: SCREEN_WIDTH, justifyContent: 'center'}}>
                {/* <Text style={{ ...styles.firstName, ...styles.whiteText }}>
                  {settingsOptions.firstName}
                </Text>
                <Text style={{ ...styles.userName, ...styles.whiteText }}>
                  {settingsOptions.email}
                </Text> */}
                <Text style={{textAlign: 'center', color: 'white',
              fontFamily: 'Poppins_400Regular', fontSize: normalize(18)}}>
                  Settings
                </Text>
              </View>
              
              <View style={{flex: 3, backgroundColor: "#f2f2f2",width: SCREEN_WIDTH, justifyContent: 'flex-end'}}>
                {/* <DashedCircle initial={settingsOptions.firstName.charAt(0)} /> */}
                <Text style={{textAlign: 'center', color: '#4294DB',
              fontFamily: 'Poppins_400Regular', fontSize: normalize(18)}}>
                  {settingsOptions.firstName}
                </Text>
              </View>
              <DashedCircle initial={settingsOptions.firstName.charAt(0)} />
            </View>
          }
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: SCREEN_HEIGHT/3,
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: 30,
    width: SCREEN_WIDTH,
    //position: 'absolute',
    backgroundColor: '#4294DB',
    top: 0
  },
  firstName: {
    fontSize: 28,
  },
  userName: {
    fontSize: 18,
  },
  whiteText: {
    fontFamily: "Bodoni 72",
    color: "white",
  },
  optionRow: {
    backgroundColor: "white",
    paddingHorizontal: SCREEN_WIDTH / 15,
    height: SCREEN_HEIGHT / 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    borderRadius: 10
  },
});

export default SettingsHome;
