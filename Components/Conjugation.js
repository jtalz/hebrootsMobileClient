import React from 'react';
import { View, Text } from 'react-native'
import { PaalVerb, PielVerb, HitpaelVerb, NifalVerb, HefilVerb } from '../Actions/PatternFormats/PatternConjugation'

const Conjugation = (props) => {
    const verb = generateVerb(props)
    const getConjugation = () => {
        try {
            return verb.getFormattedText()
        }catch(err){
        return <Text>{props.conjugation}</Text>
        }
    }
    return ( 
        <View>
            {
                getConjugation()
            }
        </View>
    );
}

export default Conjugation;

const VERB_TYPES = {
    A : PaalVerb,
    B : NifalVerb,
    C : PielVerb,
    E : HitpaelVerb,
    F : HefilVerb
}

const generateVerb = ({conjugation, morphology, pattern, tense, fontSize}) => {
    for (const [patternCode, verbType] of Object.entries(VERB_TYPES)) {
        if(pattern == patternCode){
            return new verbType({conjugation, morphology, tense, fontSize})
        }
    }
}