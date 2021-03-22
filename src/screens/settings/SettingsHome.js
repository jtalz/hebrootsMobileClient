import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { LoadingIndicator } from "../../components/atoms";
import { SettingsHeader, SettingsRow } from "../../components/molecules";
import { SETTINGS_STATIC } from "../../constants";
import { AuthContext, getDynamicSettings } from "../../services";
import { Colors, Spacing, Typography, Sizing } from "../../styles/index";

const SettingsHome = (props) => {
  const [settingsOptions, setSettingsOptions] = useState(null);
  const { signOut, backToSplash } = React.useContext(AuthContext);
  useEffect(() => {
    getDynamicSettings(signOut, backToSplash)
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
            <SettingsRow option={subItem} />
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
    height: Sizing.SCREEN_HEIGHT / 20,
    ...Spacing.justifyEnd,
    ...Spacing.alignStart,
    ...Colors.bgDarkGrey,
  },
});

export default SettingsHome;
