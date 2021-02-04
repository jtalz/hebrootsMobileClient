import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native'
import CardsCarousel from './CardsCarousel'
import {requestInfinitiveTranslation} from '../Actions/APIRequests'

const StudySection = ({tableStatus, tableData, subtopic, setActiveIndex, activeIndex, definedTranslation}) => {

  const [translatedInfinitive, setTranslatedInfinitive] = useState(definedTranslation)

  const getTranslatedInfinitive = async (infinitive) => {
    const translation = await requestInfinitiveTranslation(infinitive)
    setTranslatedInfinitive(translation.translation) 
    
  }

  useEffect(()=> {
    if (tableStatus == "Found" && definedTranslation==undefined){
      console.log('looking for translation')
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
          <Text style={{fontSize: 30, color: 'gray', fontFamily: 'American Typewriter', fontWeight: 'bold'}}>
            Try searching for any form of a Hebrew verb. 
            If you can't find what you're looking for, please contact us.
          </Text>
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