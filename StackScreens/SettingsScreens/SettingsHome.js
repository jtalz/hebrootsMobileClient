import React, {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Switch,
  Share
} from "react-native";
import DashedCircle from "../../Components/DashedCircle";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../Actions/GetMethods/ScreenDimensions";
import {Ionicons, Entypo, AntDesign} from '@expo/vector-icons';
const SettingsHome = (props) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hebroots | A helpful tool for learning Hebrew conjugations. Add link.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

const SETTINGS_OPTIONS = [
  {
    name: "My Account",
    items: [
      {
        name: "account type",
        status: "basic",
        type: "read-only"
      },
      {
        name: "email",
        status: "josh.tal27@gmail.com",
        type: "read-only"
      },
      {
        name: "password",
        status: "**********",
        type: "pressable",
        onPress: "navigate to changepasswordScreen"
      },
      {
        name: "daily reminder",
        status: false,
        type: "toggle"
      },
      {
        name: "teaching language",
        status: "English",
        type: "read-only"
      },
    ],
  },
  {
    name: "Support Us",
    items: [
      {
        name: "share with a friend",
        status: <Entypo name="share" size={24} color="black" />,
        type: "pressable",
        onPress: onShare
      },
      {
        name: "follow us on instagram",
        status: <AntDesign name="instagram" size={24} color="black" />,
        type: "pressable",
        onPress: "redirect to instagram"
      },
      {
        name: "rate us on the App Store",
        type: "read-only"
      },
      {
        name: "Donate",
        type: "read-only"
      }
    ],
  },
  {
    name: "Get in Touch",
    items: [
      {
        name: "Give feedback",
        type: "pressable",
        onPress: "redirect to mailing me"
      },
      {
        name: "Report a Bug",
        type: "pressable",
        onPress: "redirect to emailing me"
      },
      {
        name: "FAQs",
        type: "read-only"
      },
    ],
  },
  {
    name: "About",
    items: [
      {
        name: "about us",
        type: "pressable",
        onPress: "redirect to aboutusscreen"
        //description: "My name is Joshua and I've been learning Hebrew in Israel over the past 4 years. I've found that verb conjugation is essential to building a strong foundation when developing Hebrew. I hope this app helps you build your skills and please feel free to reach out. I'd be glad to hear from you."
      },
      {
        name: "version",
        type: "read-only",
        status: "1.0.1",
      },
    ],
  },
  {
    name: "Logout",
    items: [
      {
        name: "logout",
        type: "pressable",
        onPress: "logout"
      },
    ],
  },
];

const renderOption = (option) => {
  if(option.type == "read-only"){
    return (
      <View style={{...styles.optionRow}}>
        <Text>{option.name}</Text>
        <Text style={{color: 'grey'}}>{option.status}</Text>
      </View>
    )
  }else if(option.type == "pressable"){
    return (
      <TouchableOpacity style={{...styles.optionRow}} onPress={option.onPress}>
        <Text>{option.name}</Text>
        {option.status !== undefined ? <Text style={{color: 'grey'}}>{option.status}</Text> : null}
      </TouchableOpacity>
    )
  }else if(option.type == "toggle"){
    return (
      <View style={{...styles.optionRow}}>
        <Text>{option.name}</Text>
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
        {/* <Text>{option.name}</Text>
        <Text>{option.status}</Text> */}
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
        return (<View key={subItem.name}>
          {
          renderOption(subItem)
          /* <TouchableOpacity
            style={{
              
            }}
          >
            <Text>{subItem.name} </Text>
          </TouchableOpacity> */}
          <View style={{borderWidth: 0.5, width: SCREEN_WIDTH/1.1, alignSelf: 'flex-end', borderColor: '#f2f2f2'}}></View>
          </View>
        );
      })}
    </View>
  );
};


  return (
    <View>
      <FlatList
        renderItem={settingsGroup}
        data={SETTINGS_OPTIONS}
        ListHeaderComponent={
          <View style={{ ...styles.header }}>
            <View>
              <Text style={{ ...styles.firstName, ...styles.whiteText }}>
                Joshua
              </Text>
              <Text style={{ ...styles.userName, ...styles.whiteText }}>
                josh.tal27@gmail.com
              </Text>
            </View>
            <View>
              <DashedCircle initial={"J"} />
            </View>
          </View>
        }
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
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
