import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { sortByPronoun } from "../../services";
import { Spacing, Typography, Sizing } from "../../styles";
import { Card } from "../atoms";
import { TensePagination } from "../molecules";
import { ConjugationTable } from "../organisms";

class CardsCarousel extends Component {
  constructor(props) {
    super(props);
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
        carouselData.renderFn = ConjugationTable;
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
            sliderWidth={this.props.subtopic ? Sizing.SCREEN_WIDTH - 15 : Sizing.SCREEN_WIDTH - 30}
            itemWidth={Sizing.SCREEN_WIDTH - 30}
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
