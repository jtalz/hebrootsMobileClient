import React, {useEffect, useState} from "react";
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import Conjugation from './Conjugation'
import {requestExampleVerb} from '../Actions/APIRequests'

const ExampleVerb = ({ fontSize, pattern_id, morphology, pattern, tense, form }) => {
  
    const [exampleVerb, setExampleVerb] = useState({infinitive: 'loading...', base_form: 'loading...'})

    const displayNewExampleVerb = async (pattern_id) => {
        let exampleVerb = await requestExampleVerb(pattern_id, morphology)
        setExampleVerb(exampleVerb)
    }

    useEffect(()=>{
        displayNewExampleVerb(pattern_id)
    },[])

    return (
    <TouchableOpacity
      style={{ ...styles.centerCenter }}
      onPress={() => displayNewExampleVerb(pattern_id)}
    >
      <Conjugation
        fontSize={fontSize}
        conjugation={exampleVerb[form]}
        morphology={morphology}
        pattern={pattern}
        tense={tense}
      />
      <Text>Tap for another</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    centerCenter: {
        alignItems: 'center', justifyContent: 'center', padding: 5
    }
})

export default ExampleVerb;
