import React from 'react';
import {Text, View} from 'react-native'
import CardsCarousel from './CardsCarousel'

const StudySection = ({tableStatus, tableData}) => {
    if (tableStatus == "Loading") {
      return (
        <CardsCarousel
          type="Loading"
          height={{ flex: 8 }}
          carouselItems={["", "", ""]}
        />
      );
    } else if (tableStatus == "Not Found") {
      return (
        <View style={{flex:8, padding: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 30, color: 'gray', fontFamily: 'American Typewriter', fontWeight: 'bold'}}>Sorry, it seems we've run into a problem. We're always working to fix these but in the meantime please try again!</Text>
        </View>
      )
    } else if (tableStatus == "Found") {
      return (
        <CardsCarousel
          type="Conjugations"
          height={{ flex: 8 }}
          carouselItems={tableData.family}
          pattern={tableData.pattern}
          infinitive={tableData.infinitive}
          root={tableData.root}
        />
      );
    }
  };

  export default StudySection;