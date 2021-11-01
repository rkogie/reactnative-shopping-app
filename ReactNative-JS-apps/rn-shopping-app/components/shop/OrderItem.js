import React, { useState } from 'react';
import { View, StyleSheet, Button, ViewComponent } from 'react-native';
import DefaultText from '../UI/DefaultText';
import Colours from '../../constants/Colours';
import CartItem from '../shop/CartItem';
import Card from '../UI/Card';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <DefaultText style={styles.totalAmount}>${props.amount.toFixed(2)}</DefaultText>
                <DefaultText style={styles.date}>{props.date.toString()}</DefaultText>
            </View>
            <Button
                title={showDetails ? 'Hide Details' : 'Show Details'}
                color={Colours.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }} />
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem =>
                    <CartItem
                        key={cartItem.productID}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />)}
            </View>
            }
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans-reg',
        fontSize: 16,
        color: Colours.plainText,
    },
    detailItems: {
        width: '100%',
        padding: 20,
    }
})

export default OrderItem;