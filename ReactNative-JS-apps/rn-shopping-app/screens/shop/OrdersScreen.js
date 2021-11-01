import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersAction from '../../store/actions/ordersAction';
import Colours from '../../constants/Colours';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        await dispatch(ordersAction.fetchOrders());
        setIsLoading(false);

    }, [dispatch], setIsLoading);

    useEffect(() => {
        loadOrders();
    }, [dispatch], loadOrders);

    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size='large' color={Colours.primary} />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <DefaultText style={styles.text}>You have no orders. </DefaultText>
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.getDate}
                    items={itemData.item.items}
                />
            } />
    );
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons >
    };
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colours.plainText
    }
})

export default OrdersScreen;