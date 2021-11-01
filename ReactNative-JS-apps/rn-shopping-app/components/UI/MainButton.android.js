import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    TouchableNativeFeedback, Platform
} from 'react-native';
import Colours from '../../constants/Colours';


const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent
                onPress={props.onButtonPress}
                activeOpacity={.65}
            >
                <View style={{ ...props.style, ...styles.button }}>
                    <Text style={styles.btnText}>
                        {props.children}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },

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
        textAlign: 'center'
    },

});


export default MainButton;