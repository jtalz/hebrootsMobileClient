import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import Card from "../Components/Card.js";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import ConjugationRow from "../Components/ConjugationRow.js";
import { Sizing, Spacing } from "../styles/index.js";
import ConjugationTableHeader from "../Components/ConjugationTableHeader.js";

const _renderConjugations = ({ item, index }) => {
  var { pattern, tense, root, translatedInfinitive } = item;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <FlatList
          data={item.data}
          renderItem={({ item }) => (
            <ConjugationRow item={item} pattern={pattern} tense={tense} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <ConjugationTableHeader
              tense_he={item.tense.he}
              pattern={pattern}
              root={root}
              infinitive={item.infinitive}
              translatedInfinitive={translatedInfinitive}
              tense_en={item.tense.en}
            />
          }
          ListHeaderComponentStyle={styles.listHeader}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "95%",
    marginRight: 3,
    marginLeft: 5,
  },
  card: {
    flex: 1,
    shadowColor: "black",
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 15,
  },
  listContent: {
    width: SCREEN_WIDTH / 1.15,
    marginTop: -10,
    zIndex: 0,
  },
  text: {
    fontSize: 22,
    fontFamily: "Poppins_300Light",
  },
  listHeader: {
    marginBottom: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.29)",
    borderBottomWidth: 1,
    width: 238,
    ...Spacing.centerCenter,
    height: 90,
    alignSelf: "center",
    marginRight: 10,
  },
});

export default _renderConjugations;
