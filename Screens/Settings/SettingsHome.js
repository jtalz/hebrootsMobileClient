import React, {useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  ActivityIndicator
} from "react-native";
import DashedCircle from "../../Components/DashedCircle";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../Actions/ScreenDimensions";
import check_for_token from "../../Actions/Authentication/check_for_token";
import SETTINGS_STATIC from "../../Constants/SETTINGS_STATIC";
import { requestUserSettings } from "../../Actions/APIRequests";
import AuthContext from "../../Actions/context/AuthContext";
import SmallYellowButton from '../../Components/Buttons/SmallYellowButton'
import fonts from "../../Style/fontStyle";
import { normalize } from "../../Actions/Normalize";

const SettingsHome = (props) => {

const [settingsOptions, setSettingsOptions] = useState(null)
const { signOut, signInAgain } = React.useContext( AuthContext );


useEffect(()=>{
  const onLoad = async () => {
    const userProfile = await getDynamicSettings()
    const USER_SETTINGS = { 
      email: userProfile.email, 
      firstName:userProfile.firstName, 
      options: [userProfile.options, ...SETTINGS_STATIC]
    };
  setSettingsOptions(USER_SETTINGS);
  }
  onLoad()
}, []);

const getDynamicSettings = async () => {
  //check if user is logged in then return appropriate settings
  const token = await check_for_token()
  if(token !== undefined){
    const customUserSettings = await requestUserSettings(token, signOut);
    return customUserSettings;
  }else{
    return {
      firstName: '',
      email: '',
      options: {
        name: 'My Account',
        items: [
          {
            name: "sign in/register",
            type: 'pressable',
            onPress: signInAgain
          }
        ]
      }
    }
  }
}

const renderOption = (option) => {
  if(option.type == "read-only"){
    return (
      <View style={{...styles.optionRow}}>
        <Text style={{...fonts.en_light, fontSize: normalize(12)}}>{option.name}</Text>
        <Text style={{color: 'grey'}}>{option.status}</Text>
      </View>
    )
  }else if(option.type == "pressable"){
    return (
      <TouchableOpacity style={{...styles.optionRow}} onPress={option.onPress}>
        <Text style={{...fonts.en_light, fontSize: normalize(12)}}>{option.name}</Text>
        {option.status !== undefined ? <Text style={{color: 'grey'}}>{option.status}</Text> : null}
      </TouchableOpacity>
    )
  }else if(option.type == "toggle"){
    return (
      <View style={{...styles.optionRow}}>
        <Text style={{...fonts.en_light, fontSize: normalize(12)}}>{option.name}</Text>
        <Switch 
          /* trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e" */
          //onValueChange={toggleSwitch}
          //value={option.status}
        />
      </View>
    )
  }else{
    return (
      <View style={{...styles.optionRow}}>
      </View>
    )
  }
}

const settingsGroup = ({ item }) => {
  return (
    <View style={{ marginVertical: 0, backgroundColor: 'white' }}>
      <View
        style={{
          paddingHorizontal: SCREEN_WIDTH / 15,
          height: SCREEN_HEIGHT / 20,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: '#f2f2f2'
        }}
      >
        <Text>{item.name}</Text>
      </View>
      {item.items.map((subItem) => {
        //console.log(subItem)
        return (<View key={subItem.name}>
          {
          renderOption(subItem)
          }
          <View style={{borderWidth: 0.5, width: SCREEN_WIDTH/1.1, alignSelf: 'flex-end', borderColor: '#f2f2f2'}}></View>
          </View>
        );
      })}
    </View>
  );
};


  return (
    <View>
      {
        settingsOptions == null? 
        <View style={{height: SCREEN_HEIGHT, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size='large'/>
                    </View> :
        <FlatList
        renderItem={settingsGroup}
        data={settingsOptions.options}
        ListHeaderComponent={
          <View style={{ ...styles.header }}>
            <View>
              <Text style={{ ...styles.firstName, ...styles.whiteText }}>
                {settingsOptions.firstName}
              </Text>
              <Text style={{ ...styles.userName, ...styles.whiteText }}>
                {settingsOptions.email}
              </Text>
            </View>
            <View>
              <DashedCircle initial={settingsOptions.firstName.charAt(0)} />
            </View>
          </View>
        }
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: "#2B78EC",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,
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
              flexDirection: "row"
  }
});

export default SettingsHome;
