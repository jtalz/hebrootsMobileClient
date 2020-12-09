import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const _renderLesson = ({ patternName, patternSkeleton, example }) => {
    return ( 
        <View style={{  }}>
            <Text style={{...styles.title}}>
                Let's talk about the { patternName } pattern
            </Text>
            <Text>
                Most variations of this verb pattern or 'בניין' stem from an infinitive in the form: 
                { patternSkeleton }
                To use this, all you have to do is replace the stars with the 3 or 4 ROOT letters of a verb like: 
                { example.infinitive }
            </Text>
            <Text>
                Lets watch that in slow motion
                <ConjugationAnimation example={example} />
            </Text>
            <Text>
                This same idea of switching out root letters is the basis of learning verb conjugations. 
                For more, click here.
            </Text>
        </View>
     );
}

const styles = StyleSheet.create({
    title: {
        fontSize : 34,
        fontWeight: 'bold'
    }
})
 
export default _renderLesson;