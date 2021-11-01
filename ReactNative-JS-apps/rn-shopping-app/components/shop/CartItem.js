import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DefaultText from '../UI/DefaultText';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../../constants/Colours';

const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <DefaultText style={styles.quantity}>{props.quantity}</DefaultText>
                <View style={styles.textWrap}>
                    <DefaultText style={styles.bodyText}>{props.title}</DefaultText>
                </View>
            </View>
            <View style={styles.itemData}>
                <DefaultText style={styles.bodyText}>${props.amount.toFixed(2)}</DefaultText>
                {props.deletable && (
                    <TouchableOpacity style={styles.delete} onPress={props.onRemove}>
                        <Ionicons
                            name={Platform.OS == 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color='red'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginRight: 20,
        color: Colours.plainText,
        fontSize: 14,
    },
    bodyText: {
        fontFamily: 'open-sans-bold',
        fontSize: 12,
    },
    delete: {
        marginLeft: 20,
    },
})

export default CartItem