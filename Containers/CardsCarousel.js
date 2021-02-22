import React, { Component } from "react";
import sortByPronoun from "../Actions/SortByPronoun.js";
import { View, SafeAreaView, ActivityIndicator, Text, Image } from "react-native";
import Card from "../Components/Card.js";
import Carousel, { Pagination } from "react-native-snap-carousel";
import _renderConjugations from "./ConjugationTable";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Actions/ScreenDimensions";
import { normalize } from "../Actions/Normalize.js";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
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

  nextCard(){
    this.carousel.snapToNext()
  }

  prevCard(){
    this.carousel.snapToPrev()
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
            alignItems: 'center',
            padding: 5
          }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={carouselData.data}
            sliderWidth={(SCREEN_WIDTH-30)}
            itemWidth={SCREEN_WIDTH-30}
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
        <View style={{flexDirection: 'row', flex: 2, alignItems: 'flex-start', justifyContent: 'space-around', width: SCREEN_WIDTH/1.3}}>
              <TouchableOpacity onPress={()=>this.prevCard()} style={{}}>
              <AntDesign name="caretleft" size={24} color="#4294DB" />
              </TouchableOpacity>
              <Text
                style={{
                  color: activeIndex == 0 ? "#4294DB" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: "Poppins_300Light",
                }}
              >
                עבר
              </Text>
              <Text
                style={{
                  color: activeIndex == 1 ? "#4294DB" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: "Poppins_300Light",
                }}
              >
                הווה
              </Text>
              <Text
                style={{
                  color: activeIndex == 2 ? "#4294DB" : "black",
                  fontSize: normalize(16),
                  marginHorizontal: normalize(5),
                  fontFamily: "Poppins_300Light",
                }}
              >
                עתיד
              </Text>
              <TouchableOpacity onPress={()=>this.nextCard()} >
              <AntDesign name="caretright" size={24} color="#4294DB" />
              </TouchableOpacity>
            </View>
    }
      </View>
    );
  }
}

export default CardsCarousel;
