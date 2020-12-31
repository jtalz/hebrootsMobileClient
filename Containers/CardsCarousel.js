import React, { Component } from "react";
import sortByPronoun from "../Actions/SortByPronoun.js";
import { View, SafeAreaView, ActivityIndicator, Text } from "react-native";
import Card from "../Components/Card.js";
import Carousel, { Pagination } from "react-native-snap-carousel";
import _renderConjugations from "./ConjugationTable";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import { normalize } from "../Actions/Normalize.js";
import { MaterialIcons } from '@expo/vector-icons'; 
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
        <Card style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </View>
    );
  }

  render() {
    const { type, carouselItems, setActiveIndex, activeIndex } = this.props;
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
        carouselData.data = sortedFamilies
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
      <View style={{ ...this.props.height, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            flex: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: 'flex-start',
            borderColor: 'blue'
          }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={carouselData.data}
            sliderWidth={390}
            itemWidth={SCREEN_WIDTH / 1.1}
            containerCustomStyle={{flex: 1, alignSelf: 'center'}}
            slideStyle={{ }}
            renderItem={carouselData.renderFn}
            onSnapToItem={(index) => setActiveIndex(index)}
            removeClippedSubviews={false}
          />
        </View>

        {
          this.props.subtopic ? 
          <View style={{flexDirection: 'row', flex: 2, height: '100%', alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text
                style={{
                  color: "blue",
                  fontSize: normalize(20),
                  marginHorizontal: normalize(5),
                  fontFamily: "Rubik_300Light",
                }}
              >
                {this.props.subtopic}
              </Text>
            </View>
            : 
        <View style={{flexDirection: 'row', flex: 2, height: '100%', alignItems: 'flex-start', justifyContent: 'center'}}>
              <MaterialIcons name="chevron-left" size={24} color="black" />
              <Text
                style={{
                  color: activeIndex == 0 ? "blue" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: activeIndex == 0 ? "Rubik_400Regular" : "Rubik_300Light",
                }}
              >
                עבר
              </Text>
              <Text
                style={{
                  color: activeIndex == 1 ? "blue" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: activeIndex == 1 ? "Rubik_400Regular" : "Rubik_300Light",
                }}
              >
                הווה
              </Text>
              <Text
                style={{
                  color: activeIndex == 2 ? "blue" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: activeIndex == 2 ? "Rubik_400Regular" : "Rubik_300Light",
                }}
              >
                עתיד
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
    }
      </View>
    );
  }
}

export default CardsCarousel;
