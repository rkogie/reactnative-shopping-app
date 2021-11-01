import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authAction';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colours from '../../constants/Colours';
import MainButton from '../../components/UI/MainButton';
import { LinearGradient } from 'expo-linear-gradient';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.validity
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
}

const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    })


    useEffect(() => {
        if (error) {
            Alert.alert('An Error occured', error, [{ text: 'OK' }])
        }
    }, [error]);


    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.logIn(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }


    const signInChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                input: inputIdentifier,
                value: inputValue,
                validity: inputValidity,
            })
        }, [dispatchFormState])


    return (
        <KeyboardAvoidingView
            /* behavior='padding' */
            keyboardVerticalOffset={50}
            style={styles.screen}>

            <LinearGradient colors={['#42C1E9', '#ABE4F6']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail Address'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email'
                            onInputChange={signInChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={signInChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.btnContainer}>
                            {isLoading
                                ? <ActivityIndicator
                                    size='small'
                                    color={Colours.primary} />
                                : <MainButton
                                    onButtonPress={authHandler}
                                >{isSignUp ? 'Sign Up' : 'Login'}</MainButton>}
                        </View>
                        <View style={styles.btnContainer}>
                            <MainButton
                                style={{ backgroundColor: Colours.accent }}
                                onButtonPress={() => {
                                    setIsSignUp(prevState => !prevState);
                                }}
                            >{`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}</MainButton>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = () => {
    return {
        headerTitle: 'Store App: Welcome',
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    btnContainer: {
        marginTop: 10,
        padding: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthScreen;