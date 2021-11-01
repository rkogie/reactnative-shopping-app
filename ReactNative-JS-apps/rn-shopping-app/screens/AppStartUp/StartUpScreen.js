import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authAction';
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import Colours from '../../constants/Colours';

const StartUpScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userID, sessionExpiry } = transformedData;
            const sessionExpires = new Date(sessionExpiry);

            if (sessionExpires <= new Date() || !token || !userID) {
                props.navigation.navigate('Auth');
                return;
            }

            const expTime = sessionExpires.getTime() - new Date().getTime;
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(token, userID, expTime));

        }
        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colours.accent} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartUpScreen;