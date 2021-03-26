import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Bird, StadiumButton } from "../../components/atoms";
import { ExampleVerb } from "../../components/molecules";
import { Colors, Sizing, Typography } from "../../styles/index.js";

const PatternLessonScreen = ({ route, navigation }) => {
  const {
    pattern,
    name,
    aspects,
    infinitive_form,
    pattern_id,
    transliteration,
    tense,
  } = route.params;

  const Lesson = () => {
    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            padding: 20,
            backgroundColor: "white",
          }}
        >
          {/* <Bird
            birdType="Standard"
            size="SmallPlus"
            style={{ marginVertical: 25 }}
          /> */}
          <View style={{ marginBottom: 20, ...styles.margin5 }}>
            <Text style={styles.title}>
              Let's learn about {transliteration} (
              <Text style={{ ...styles.hebrewText }}>{name}</Text>) in the{" "}
              {tense.toLowerCase()} tense!
            </Text>
          </View>
          <Image
            style={{ resizeMode: "contain", width: Sizing.SCREEN_WIDTH, height: Sizing.SCREEN_HEIGHT/4, alignSelf: 'center', marginVertical: 10 }}
            source={{
              uri:
                "https://user-images.githubusercontent.com/31594943/112562751-626bf400-8dae-11eb-96a6-205008e5e657.png",
            }}
          />
          
          <View style={{ ...styles.margin5 }}>
            <Text
              style={{
                writingDirection: "ltr",
                marginBottom: 5,
                ...styles.lessonText,
              }}
            >
              Verbs tell of something being done to or by someone or something
              like{" "}
              <Text style={{ fontFamily: "Nunito_200ExtraLight_Italic" }}>
                to read, to write or to count.
              </Text>{" "}
              They can also be mental states like{" "}
              <Text style={{ fontFamily: "Nunito_200ExtraLight_Italic" }}>
                to know, to have and to like.
              </Text>
            </Text>
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text
              style={{
                writingDirection: "ltr",
                marginBottom: 5,
                ...styles.lessonText,
              }}
            >
              {transliteration} verbs fall under the "{aspects[0]}" category
            </Text>
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>
              In their infinitive form, {transliteration} verbs look like:
            </Text>
          </View>

          <View style={{ ...styles.margin5, alignSelf: "center" }}>
            <Text
              style={{
                ...styles.lessonText,
                ...styles.hebrewText,
              }}
            >
              {infinitive_form}
            </Text>
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>here's an example</Text>
          </View>

          <View style={{ ...styles.margin5, alignSelf: "center" }}>
            <ExampleVerb
              fontSize={24}
              morphology={"INFINITIVE"}
              form={"infinitive"}
              pattern={pattern}
              tense={"INFINITIVE"}
              pattern_id={pattern_id}
            />
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>Did you catch that?</Text>
          </View>
          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>
              We only replaced the three root letters
            </Text>
          </View>
          <View style={{ ...styles.margin5, alignSelf: "center" }}>
            <Text style={{ ...styles.hebrewText }}>פ . ע . ל</Text>
          </View>
          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>
              Lets conjugate this one together in the past tense with the
              subject "he" (
              <Text style={{ ...styles.hebrewText }}>הוא בעבר</Text>){" "}
            </Text>
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text style={{ ...styles.lessonText }}>it will be...</Text>
          </View>

          <View style={{ ...styles.margin5, alignSelf: "center" }}>
            <ExampleVerb
              fontSize={24}
              morphology={"THIRD+M+SINGULAR"}
              form={"base_form"}
              pattern={pattern}
              tense={"PAST"}
              pattern_id={pattern_id}
            />
          </View>

          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>
              Remember that the letters in <Text style={{color: Colors.magenta, ...Typography.regular}}>magenta</Text> are interchangable while the
              letters in <Text style={{color: Colors.green, ...Typography.regular}}>green</Text> will almost always stay the same.
            </Text>
          </View>
          <View style={{ ...styles.margin5 }}>
            <Text style={styles.lessonText}>
              To help you remember this, think root+pattern=verb
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              margin: 20,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: 'space-around',
              alignItems: 'center',
              alignSelf: 'center',
              width: "95%",
            }}
          >
            <StadiumButton
              name="Go back"
              backgroundColor={Colors.hebrootsBlue}
              onClick={() =>
                navigation.goBack()
              }
              //size={{width: Sizing.SCREEN_WIDTH/2}}
            />
            <StadiumButton
              name="Continue"
              backgroundColor={Colors.green}
              onClick={() =>
                navigation.navigate("ExampleExplore", {
                  pattern_id,
                  subtopic: tense,
                })
              }
              //size={{width: Sizing.SCREEN_WIDTH/2}}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 6,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Lesson />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: Sizing.SCREEN_WIDTH,
    flex: 1,
  },
  lessonText: {
    ...Typography.light,
    ...Typography.size14,
    lineHeight: 30,
  },
  hebrewText: {
    ...Typography.size18,
  },
  title: {
    ...Typography.light,
    ...Typography.size18,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Sizing.SCREEN_WIDTH / 1.5,
    alignSelf: "center",
  },
  margin5: {
    margin: 5,
  },
});

export default PatternLessonScreen;
