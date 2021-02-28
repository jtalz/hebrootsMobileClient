import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import SETTINGS_STATIC from "../../Constants/SETTINGS_STATIC";
import { Colors, Spacing, Typography } from "../../styles/index";
import LoadingIndicator from "../../Components/LoadingIndicator";
import SettingsHeader from "../../Containers/SettingsHeader";
import SettingsTab from "../../Components/SettingsTab";
import getDynamicSettings from "../../Actions/GetMethods/GetDynamicSettings";
import AuthContext from '../../Actions/context/AuthContext'

const SettingsHome = (props) => {
  const [settingsOptions, setSettingsOptions] = useState(null);
  const { signOut, signInAgain } = React.useContext(AuthContext);
  useEffect(() => {
    getDynamicSettings(signOut, signInAgain)
      .then((userProfile) => ({
        email: userProfile.email,
        firstName: userProfile.firstName,
        options: [userProfile.options, ...SETTINGS_STATIC],
      }))
      .then((user_settings) => setSettingsOptions(user_settings));
  }, []);

  const settingsGroup = ({ item }) => {
    return (
      <View style={{ marginVertical: 0 }}>
        <View style={styles.groupTitleWrapper}>
          <Text style={styles.settingsText}>{item.name}</Text>
        </View>
        {item.items.map((subItem) => (
          <View key={subItem.name}>
            <SettingsTab option={subItem} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {settingsOptions == null ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          renderItem={settingsGroup}
          data={settingsOptions.options}
          contentContainerStyle={{}}
          ListHeaderComponent={
            <SettingsHeader firstName={settingsOptions.firstName} />
          }
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ...Colors.bgDarkGrey,
  },
  settingsText: {
    ...Typography.regular,
    ...Typography.size12,
  },
  groupTitleWrapper: {
    paddingHorizontal: 30,
    height: SCREEN_HEIGHT / 20,
    ...Spacing.justifyEnd,
    ...Spacing.alignStart,
    ...Colors.bgDarkGrey,
  },
});

export default SettingsHome;
