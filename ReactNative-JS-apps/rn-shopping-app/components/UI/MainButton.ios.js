import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colours from '../../constants/Colours';

const MainButton = props => {
    return (
        <TouchableOpacity
            onPress={props.onButtonPress}
            activeOpacity={.65}
        >
            <View style={{ ...props.style, ...styles.button }}>
                <Text style={styles.btnText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colours.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    btnText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 12,
    },

});


export default MainButton;