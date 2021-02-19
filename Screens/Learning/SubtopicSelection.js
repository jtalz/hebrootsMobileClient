import React from "react";
import { Text, FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import Bird from "../../Components/Characters/Bird";
import _3DButton from "../../Components/Buttons/_3DButton";
import { SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import TENSES from "../../Constants/TENSES";
import LongRectangleButton from "../../Components/Buttons/LongRectangleButton";

const SubtopicSelection = ({ navigation, route }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intro}>
        <Bird size="Large" birdType="Old" style={{ top: 20, left: -25 }} />
        <Text
          style={{
            //...fonts.he_light,
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
          }}
        >
          {route.params.name}
        </Text>
        <Text
          style={{
            //...fonts.en_light,
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
          }}
        >
          Please select a tense
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUp"
        direction="alternate"
        style={{ flex: 2 }}
      >
        
          <FlatList
            data={TENSES}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            horizontal={false}
            numColumns={1}
            renderItem={({item}) => (
              <LongRectangleButton
                name={item.name_he}
                details={[item.name_en]}
                onPress={() =>
                  navigation.navigate("PatternLesson", {
                    ...route.params,
                    subtopic: item.name_en.toUpperCase(),
                  })
                }
              />
            )}
            keyExtractor={(item) => item.name_en}
            scrollEnabled={true}
          />
        
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "white",
  },
  intro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 40,
  },
  listItem: {
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 8,
  },
});

export default SubtopicSelection;