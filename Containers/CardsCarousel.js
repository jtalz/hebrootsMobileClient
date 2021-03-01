import React, { Component } from "react";
import sortByPronoun from "../Actions/SortByPronoun.js";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import Card from "../Components/Card.js";
import Carousel from "react-native-snap-carousel";
import _renderConjugations from "./ConjugationTable";
import { SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import { Spacing, Typography } from "../styles/index.js";
import TensePagination from "../Components/TensePagination.js";
class CardsCarousel extends Component {
  constructor(props) {
    super(props);
/*     this.carousel = React.createRef(); */
    this.state = {
      activeIndex: 0,
      showTranslation: false,
    };
  }

  toggleTranslation(show) {
    this.setState({ showTranslation: !show });
  }

  _renderLoading({ item, index }) {
    return (
      <View style={{ height: "90%", marginRight: 3, marginLeft: 5 }}>
        <Card
          style={{
            flex: 1,
            shadowColor: "black",
            paddingTop: 15,
            paddingBottom: 10,
            borderRadius: 15,
            ...Spacing.justifyCenter
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </View>
    );
  }

  render() {
    const {
      type,
      carouselItems,
      setActiveIndex,
      activeIndex,
      height,
    } = this.props;
    let carouselData = {};
    switch (type) {
      case "Conjugations":
        //apply a compose function here -> compose ((verbFamily, ...)=> {tense: subFamily.tense, data: sortedSubData, pattern, infinitive, root, translatedInfinitive}, sortByPronoun)(verbFamily)
        const sortedFamilies = carouselItems.map((family) => {
          let sorted = sortByPronoun(family.data);
          return {
            tense: family.tense,
            data: sorted,
            pattern: this.props.pattern,
            infinitive: this.props.infinitive,
            root: this.props.root,
            translatedInfinitive: this.props.translatedInfinitive,
          };
        });
        carouselData.data = sortedFamilies;
        var self = this;
        carouselData.data.forEach((c) => {
          c.translation = self.props.translation;
          c.toggle = self.toggleTranslation.bind(self);
          c.showTranslation = self.state.showTranslation;
        });
        carouselData.renderFn = _renderConjugations;
        break;
      case "Loading":
        carouselData.data = [""];
        carouselData.renderFn = this._renderLoading;
        break;
      default:
        null;
    }
    
    return (
      <View
        style={{
          ...height,
          ...Spacing.centerCenter
        }}
      >
        <View style={styles.main}>
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={carouselData.data}
            sliderWidth={this.props.subtopic ? SCREEN_WIDTH - 15 : SCREEN_WIDTH - 30}
            itemWidth={SCREEN_WIDTH - 30}
            containerCustomStyle = {{}}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            slideStyle={{}}
            renderItem={carouselData.renderFn}
            onSnapToItem={(index) => setActiveIndex(index)}
            removeClippedSubviews={false}
          />
        </View>
        {this.props.subtopic ? (
          null
        ) : (
          <TensePagination activeIndex={activeIndex} nextCard={()=>this.carousel.snapToNext()} prevCard={() =>this.carousel.snapToPrev()} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    ...Typography.size18,
    ...Spacing.m5,
    ...Typography.light,
  },
  main: {
    flex: 15,
    ...Spacing.row,
    ...Spacing.centerCenter,
    ...Spacing.p5
  },
  singleTense: {
    ...Spacing.row,
    flex: 2,
    height: "100%",
    ...Spacing.alignStart,
    ...Spacing.justifyCenter,
  },
});

export default CardsCarousel;
