import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native'
import CardsCarousel from './CardsCarousel'
import {requestInfinitiveTranslation} from '../Actions/APIRequests'

const StudySection = ({tableStatus, tableData, subtopic, setActiveIndex, activeIndex}) => {

  const [translatedInfinitive, setTranslatedInfinitive] = useState('')

  const getTranslatedInfinitive = async (infinitive) => {
    const translation = await requestInfinitiveTranslation(infinitive)
    setTranslatedInfinitive(translation.translation) 
  }

  useEffect(()=> {
    if (tableStatus == "Found"){
      getTranslatedInfinitive(tableData.infinitive)
    }
  }, [tableData.infinitive])

    
    if (tableStatus == "Loading") {
      return (
        <CardsCarousel
          type="Loading"
          height={{ flex: 8 }}
          carouselItems={subtopic ? [""] : ["", "", ""]}
          subtopic={subtopic}
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
          carouselItems={subtopic ? [tableData.family.find(obj=>obj.tense.en == subtopic)] : tableData.family}
          pattern={tableData.pattern}
          infinitive={tableData.infinitive}
          root={tableData.root}
          translatedInfinitive={translatedInfinitive}
          subtopic={subtopic}
          setActiveIndex = {setActiveIndex}
          activeIndex = {activeIndex}
        />
      );
    }
  };

  export default StudySection;