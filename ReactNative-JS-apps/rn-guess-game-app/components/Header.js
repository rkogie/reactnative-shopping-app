import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colours from '../constants/Colours';
import TitleText from '../components/TitleText';


const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',

    },

    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: Colours.primary,
        borderBottomWidth: 4,

    },

    headerAndroid: {
        backgroundColor: Colours.primary
    },

    headerTitle: {
        color: Platform.OS === 'ios' ? Colours.primary : 'white',
        fontSize: 22,
        fontFamily: 'open-sans-bold',
    }

});

export default Header;