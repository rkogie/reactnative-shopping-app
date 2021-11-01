import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button, ActivityIndicator } from 'react-native';
import DefaultText from '../../components/UI/DefaultText';
import Colours from '../../constants/Colours';
import CartItem from '../../components/shop/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cartAction';
import * as ordersActions from '../../store/actions/ordersAction';
import Card from '../../components/UI/Card';


const CartScreen = props => {
    const [isLoading, setisLoading] = useState(false);
    //Can add functionality to handler errors as per other screens (optional)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {

        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                //not the same as the cartConstructor attributes due to the productID key
                productID: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });

        }
        return transformedCartItems.sort((topItem, bottomItem) => {
            topItem.productID > bottomItem.productID ? 1 : -1;
        });
    })

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setisLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        setisLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>

                <DefaultText style={styles.summaryText}>Total:
                    <Text style={styles.priceText}> ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </DefaultText>
                {isLoading
                    ? <ActivityIndicator size='small' color={Colours.primary} />
                    : <Button
                        title='Order Now'
                        color={Colours.priceText}
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />}

            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productID}
                    renderItem={itemData =>
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => {
                                dispatch(cartActions.removeFromCart(itemData.item.productID));
                            }} />}
                />
            </View>
        </View>
    );
}

CartScreen.navigationOptions = () => {
    return {
        headerTitle: ' Your Cart',
    };
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colours.plainText
    },
    priceText: {
        color: Colours.accent,
    }
})

export default CartScreen;