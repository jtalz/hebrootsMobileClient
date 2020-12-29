import React, {useEffect, useState} from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import * as Animatable from "react-native-animatable";
import Bird from '../../Components/Characters/Bird';
import { requestAllPatterns } from "../../Actions/APIRequests";
import _3DButton from '../../Components/Buttons/_3DButton'
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Actions/ScreenDimensions'

const SelectAPattern = ({navigation, route}) => {

    const [patterns, setPatterns] = useState(null)


    const displayPatternsOnScreen = async () => {
        let patterns = await requestAllPatterns()
        setPatterns(patterns)
    }

    useEffect(() => {
        displayPatternsOnScreen()
    }, []);

    const renderItem = ({ item }) => (
        <_3DButton 
        width ={SCREEN_WIDTH-60}
        height = {SCREEN_HEIGHT/11} 
        textSize = {24}
        color = {'black'}
        backgroundColor = {'white'}
        borderWidth = {1}
        borderRadius = {5}
        borderColor = {'#C0C0C0'}
        backgroundShadow = {'white'}
        backgroundDarker = {'#C0C0C0'}
        backgroundActive = {'#FFD350'}
        onPress = {() => 
            navigation.navigate('LearnAPattern', {
                pattern: item.pattern,
                name: item.name,
                aspects: item.aspects,
                infinitive_form: item.infinitive_form,
                pattern_id: item._id,
                transliteration: item.transliteration
            })} 
        name = {item.name}
        details = {[item.transliteration, item.aspects[0]]}
        enabled = {true}
        style = {{marginVertical: 10}}
        fontSize = {SCREEN_HEIGHT/55}
        />
    );
    return (
        <View style={styles.container}>
            <View style={styles.intro}>
                <Bird
                    size = 'Large'
                    birdType = 'Old'
                    style={{ top: 20, left: -25}}
                />
                <Text style={{width: '65%', fontSize: SCREEN_HEIGHT/35, textAlign: 'center', fontFamily: 'Nunito_300Light',}}>
                    hi josh!
                </Text>
                <Text style={{width: '65%', fontSize: SCREEN_HEIGHT/35, textAlign: 'center', fontFamily: 'Nunito_300Light',}}>
                    let's learn about one of the following topics
                </Text>
            </View>
            <Animatable.View 
            animation="fadeInUp"
            direction="alternate"
            style={{flex: 2}}>
                {
                    patterns !== null ? 
                <FlatList
                    data={patterns}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} 
                    horizontal={false}
                    numColumns={1}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    scrollEnabled={true}
                /> : null}
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: 'white'
    },
    intro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 40
    },
    listItem: {
        alignItems: 'center',
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 8,
    }
})

export default SelectAPattern;