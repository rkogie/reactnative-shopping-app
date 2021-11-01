import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../constants/Colours';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/AppStartUp/StartUpScreen';
import * as authActions from '../store/actions/authAction';
import { useDispatch } from 'react-redux';


const defaultNavConfig = {
    headerStyle: {
        backgroundColor: Platform.OS == 'android' ? Colours.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans-reg',
    },
    headerTintColor: Platform.OS == 'android' ? 'white' : Colours.primary,
}



const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavConfig
})

const OrdersNavigator = createStackNavigator(
    { Orders: OrdersScreen }, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavConfig
})


const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    }, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavConfig
})


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
}, {
    contentOptions: {
        activeTintColor: Colours.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style={styles.container}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    <Button
                        title='Sign Out'
                        color={Colours.accent}
                        onPress={() => {
                            dispatch(authActions.logOut());
                            //props.navigation.navigate('Auth');
                        }} />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavConfig
})

//Root Navigator
const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    }
})
export default createAppContainer(MainNavigator);