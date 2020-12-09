import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.whiteCard, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    whiteCard: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { height: 4, width: 0 },
    }
})
export default Card;