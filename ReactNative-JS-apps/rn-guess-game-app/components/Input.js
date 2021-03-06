import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colours from '../constants/Colours';

const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: Colours.accent,
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});


export default Input;