import React from 'react';
import { View, Text } from 'react-native'
import {PaalInflection} from '../Actions/TextFormats/InflectionFormats/PaalInflection'
import {NifalInflection} from '../Actions/TextFormats/InflectionFormats/NifalInflection'
import {PielInflection} from '../Actions/TextFormats/InflectionFormats/PielInflection'
import {HitpaelInflection} from '../Actions/TextFormats/InflectionFormats/HitpaelInflection'
import {HefilInflection} from '../Actions/TextFormats/InflectionFormats/HefilInflection'

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
    A : PaalInflection,
    B : NifalInflection,
    C : PielInflection,
    E : HitpaelInflection,
    F : HefilInflection
}

const generateVerb = ({conjugation, morphology, pattern, tense, fontSize}) => {
    for (const [patternCode, verbType] of Object.entries(VERB_TYPES)) {
        if(pattern == patternCode){
            return new verbType({conjugation, morphology, tense, fontSize})
        }
    }
}