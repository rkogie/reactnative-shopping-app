import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colours from '../constants/Colours';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import { AntDesign } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const Game = props => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initGuess = generateRandomBetween(1, 99, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [pastGuesses, setPassedGuesses] = useState([initGuess.toString()]);
    const [detectedDeviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [detectedDeviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHi = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {

        const updateLayout = () => {
            setDeviceWidth(Dimensions.get('window').width);
            setDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };

    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'higher' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'Stop giving wrong answers!!', [{
                text: 'Sorry',
                style: 'cancel'
            }]);
            return;
        }
        if (direction === 'lower') {
            currentHi.current = currentGuess;

        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum =
            generateRandomBetween(currentLow.current, currentHi.current, currentGuess);
        setCurrentGuess(nextNum);
        //setRounds(currRounds => currRounds + 1);
        setPassedGuesses(currPastGuesses =>
            [nextNum.toString(), ...currPastGuesses]);
    };

    let listContainerStyle = styles.listContainer;

    if (detectedDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (detectedDeviceHeight < 500) {
        return (<View style={styles.screen}>
            <BodyText>Computer's Guess</BodyText>
            <View style={styles.controls}>
                <MainButton onButtonPress={nextGuessHandler.bind(this, 'lower')}>
                    <AntDesign name='down' size={24} color='white' />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>

                <MainButton onButtonPress={nextGuessHandler.bind(this, 'higher')}>
                    <AntDesign name='up' size={24} color='white' />
                </MainButton>
            </View>
            <View style={listContainerStyle}>
                {/*  <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>

        </View>);
    }


    return (
        <View style={styles.screen}>
            <BodyText>Your phone guessed</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onButtonPress={nextGuessHandler.bind(this, 'lower')}>
                    <AntDesign name='down' size={24} color='white' />
                </MainButton>
                <MainButton onButtonPress={nextGuessHandler.bind(this, 'higher')}>
                    <AntDesign name='up' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/*  <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '70%',
    },

    buttonTxt: {
        fontSize: 13,
    },

    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },

    listItem: {
        borderBottomColor: Colours.accent,
        borderBottomWidth: 2,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    },

    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
    },

    listContainerBig: {
        flex: 1,
        width: '80%',
    },


});

export default Game;