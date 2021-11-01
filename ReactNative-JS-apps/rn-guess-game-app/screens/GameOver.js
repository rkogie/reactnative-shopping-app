import React from 'react';
import {
    View, Text, StyleSheet, Button, Image,
    Dimensions, ScrollView, SafeAreaView
} from 'react-native';
import Colours from '../constants/Colours';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOver = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Card style={styles.outputContainer}>
                    <TitleText style={styles.textGameOver}>Game Over</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/success.png')}
                            //source={{ uri: 'https://cdn.pixabay.com/photo/2019/01/22/18/30/summit-3948706_1280.jpg' }}
                            style={styles.image}
                            resizeMode='cover'
                            fadeDuration={1000} />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.text}>Your phone took <Text style={styles.highlight}>{props.roundsNumber}</Text> turns to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                        </BodyText>
                    </View>

                    <View style={styles.button}>
                        <MainButton
                            onButtonPress={props.onNewGame}
                        >Play Again</MainButton>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingVertical: 10,
    },

    numberOutput: {
        fontSize: 16,
        padding: 3,
    },

    button: {
        width: 150,
        fontSize: 100,
    },

    text: {
        textAlign: 'center',
        //fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },

    resultContainer: {
        marginBottom: 50,
        marginVertical: Dimensions.get('window').height / 60,
    },

    textGameOver: {
        fontSize: 30,
        paddingBottom: 15,
        color: Colours.primary,
    },

    outputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },

    highlight: {
        color: Colours.accent,
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        //fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    }
});

export default GameOver;