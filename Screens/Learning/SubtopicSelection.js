import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import Bird from "../../Components/Characters/Bird";
import { requestAllPatterns } from "../../Actions/APIRequests";
import _3DButton from "../../Components/Buttons/_3DButton";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Actions/ScreenDimensions";
import TENSES from "../../Constants/TENSES";

const SubtopicSelection = ({ navigation, route }) => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    setTopics(TENSES)
  }, []);

  const onLessonSelect = (lesson) => {
    navigation.navigate("PatternLesson", {
        ...route.params,
        subtopic: lesson.name_en.toUpperCase()
      });
  };

  const renderItem = ({ item }) => (
    <_3DButton
      width={SCREEN_WIDTH - 60}
      height={SCREEN_HEIGHT / 11}
      textSize={24}
      color={"black"}
      backgroundColor={"white"}
      borderWidth={1}
      borderRadius={5}
      borderColor={"#C0C0C0"}
      backgroundShadow={"white"}
      backgroundDarker={"#C0C0C0"}
      backgroundActive={"#FFD350"}
      onPress={() => onLessonSelect(item)}
      name={item.name_en}
      details={[item.name_he]}
      enabled={true}
      style={{ marginVertical: 10 }}
      fontSize={SCREEN_HEIGHT / 55}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intro}>
        <Bird size="Large" birdType="Old" style={{ top: 20, left: -25 }} />
        <Text
          style={{
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
            fontFamily: "Nunito_300Light",
          }}
        >
          {route.params.name}
        </Text>
        <Text
          style={{
            width: "65%",
            fontSize: SCREEN_HEIGHT / 35,
            textAlign: "center",
            fontFamily: "Nunito_300Light",
          }}
        >
          please select a tense
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUp"
        direction="alternate"
        style={{ flex: 2 }}
      >
        {topics !== null ? (
          <FlatList
            data={topics}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            horizontal={false}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item) => item.name_en}
            scrollEnabled={true}
          />
        ) : null}
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
