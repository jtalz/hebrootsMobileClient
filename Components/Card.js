import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacing } from '../styles';

const Card = (props) => {
    return (
        <View style={{...styles.whiteCard, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    whiteCard: {
        ...Spacing.justifyStart,
        ...Spacing.alignCenter,
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { height: 1, width: 0 },
    }
})
export default Card;