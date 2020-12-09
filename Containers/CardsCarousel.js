import React, { Component } from "react";
import sortByPronoun from "../Actions/SortByPronoun.js";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Card from "../Components/Card.js";
import Carousel, { Pagination } from "react-native-snap-carousel";
import _renderConjugations from './ConjugationTable';
import _renderLesson from '../Components/CardLayouts/Lesson'
import { SCREEN_WIDTH } from '../Actions/GetMethods/ScreenDimensions'


class CardsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      showTranslation: false
    };
  }

  toggleTranslation(show) {
    this.setState({showTranslation: !show})
  }

  _renderLoading({ item, index }) {
    return (
      <View style={{ height: "90%", marginRight: 3, marginLeft: 5 }}>
        <Card style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </View>
    );
  }

  get pagination() {
    const { activeIndex } = this.state;
    const { carouselItems } = this.props;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          backgroundColor: "transparent",
          flex: 0.1,
          marginTop: 10
        }}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 1,
          backgroundColor: "#2C80FF",
          marginVertical: 1,
          marginBottom: -10,
        }}
        inactiveDotStyle={{
          backgroundColor: "#C4C4C4"
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={0.9}
      />
    );
  }

  render() {
    const { type, carouselItems } = this.props;
    let carouselData = {};
    switch (type) {
      case "Conjugations":
        carouselData.data = sortByPronoun(
          carouselItems,
          this.props.pattern,
          this.props.infinitive,
          this.props.root,
          this.props.translatedInfinitive
        );
        var self = this;
        carouselData.data.forEach(c => { c.translation = self.props.translation;c.toggle = self.toggleTranslation.bind(self); c.showTranslation = self.state.showTranslation})
        carouselData.renderFn = _renderConjugations;
        carouselData.style = {
          width: "100%",
          height: "108%",
          marginBottom: -50
        };
        break;
      case "Lesson":
        carouselData.data = carouselItems;
        carouselData.renderFn = _renderLesson;
        carouselData.style = {
          width: "100%",
          height: "105%",
          marginBottom: -50,
        };
        break;
      case "Loading":
        carouselData.data = ["", "", ""];
        carouselData.renderFn = this._renderLoading;
        carouselData.style = {
          width: "100%",
          height: "108%",
          marginBottom: -50,
        };
        break;
      default:
        null;
    }

    return (
      <SafeAreaView style={{ ...this.props.height }}>
        <View
          style={{
            flex: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={carouselData.data}
            sliderWidth={390}
            itemWidth={SCREEN_WIDTH/1.1}
            containerCustomStyle={carouselData.style}
            slideStyle={{ height: "100%" }}
            renderItem={carouselData.renderFn}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            removeClippedSubviews={false}
          />
        </View>
        {this.pagination}
      </SafeAreaView>
    );
  }
}

export default CardsCarousel;
