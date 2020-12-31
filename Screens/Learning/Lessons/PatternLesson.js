import React,{useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import SmallYellowButton from '../../../Components/Buttons/SmallYellowButton.js'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../Actions/ScreenDimensions'
import ExampleVerb from '../../../Components/ExampleVerb'

const PatternLesson = ({ route, navigation }) => {
    const { pattern, name, aspects, infinitive_form, pattern_id, transliteration, subtopic } = route.params;

    const Lesson = () => {

        return (
            <ScrollView contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'space-evenly', padding: 20, paddingTop: 30, backgroundColor: 'white'}}>
                <View style={{marginBottom: 20, ...styles.margin5}}>
                    <Text style={styles.title}>Let's learn about {transliteration} (<Text style={{...styles.hebrewText}}>{name}</Text>)!</Text>
                </View>
                
                <View style={{...styles.margin5}}>
                    <Text style={{writingDirection:'ltr', marginBottom: 5,...styles.lessonText}}>Verbs tell of something being done to or by someone or something like <Text style={{fontFamily: 'Nunito_200ExtraLight_Italic'}}>to read, to write or to count.</Text> They can also be mental states like <Text style={{fontFamily: 'Nunito_200ExtraLight_Italic'}}>to know, to have and to like.</Text></Text>
                </View>

                <View style={{...styles.margin5}}>
                    <Text style={{writingDirection:'ltr', marginBottom: 5,...styles.lessonText}}>{transliteration} verbs are mostly {aspects[0]} meaning</Text>
                </View>

                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>
                        In their infinitive form, {transliteration} verbs look like: 
                    </Text>
                </View>

                <View style={{...styles.margin5, alignSelf: 'center'}}>
                    <Text style={{...styles.lessonText,...styles.hebrewText, fontSize: 24}}>{infinitive_form}</Text>
                </View>

                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>
                        here's an example
                    </Text>
                </View>
                
                <View style={{...styles.margin5, alignSelf: 'center'}}>
                    <ExampleVerb 
                        fontSize= {24} 
                        morphology={'INFINITIVE'} 
                        form={'infinitive'}
                        pattern={pattern} 
                        tense={'INFINITIVE'}
                        pattern_id={pattern_id}
                    />
                </View>

                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>Did you catch that?</Text>
                </View>
                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>We only replaced the three root letters</Text>
                    
                </View>
                <View style={{...styles.margin5, alignSelf: 'center'}}>
                    <Text style={{...styles.hebrewText}}>פ . ע . ל</Text>
                </View>
                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>Lets conjugate this one together in the past tense with the subject "he" (<Text style={{...styles.hebrewText}}>הוא בעבר</Text>) </Text>
                </View>

                <View style={{...styles.margin5}}>
                    <Text style={{...styles.lessonText}}>
                        it will be...
                    </Text>
                </View>

                <View style={{...styles.margin5, alignSelf: 'center'}}>
                    <ExampleVerb 
                        fontSize= {24} 
                        morphology={'THIRD+M+SINGULAR'} 
                        form={'base_form'}
                        pattern={pattern} 
                        tense={'PAST'}
                        pattern_id={pattern_id}
                    />
                    </View>

                <View style={{...styles.margin5}}>
                <Text style={styles.lessonText}>Remember that the letters in green are interchangable while the letters in blue will almost always stay the same.</Text>
                </View>
                <View style={{...styles.margin5}}>
                    <Text style={styles.lessonText}>To help you remember this, think root+pattern=verb</Text>
                </View>
                <View style = {{flex: 1, margin: 10, width: '80%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <SmallYellowButton name='Continue' 
                    onClick={()=>
                        navigation.navigate('ExampleExplore', {pattern_id, subtopic})}
                    />
            </View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <Lesson/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        flex: 1
    },
    textHeader: {
        fontFamily: 'Bodoni 72',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: 'black'
    },
    lessonText : {
        fontFamily: 'Nunito_200ExtraLight',
        fontSize: 18,
        lineHeight: 30
    },
    hebrewText: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 18
    },
    title: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 26,
        fontWeight: "400"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.5,
        alignSelf: 'center'
    },
    margin5 : {
        margin: 5
    }
})

export default PatternLesson;