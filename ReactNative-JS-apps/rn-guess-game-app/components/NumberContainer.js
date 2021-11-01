import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../constants/Colours';


const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={{ ...styles.number, ...props.style }}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colours.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    number: {
        color: Colours.accent,
        fontSize: 22,
    }
});

export default NumberContainer;