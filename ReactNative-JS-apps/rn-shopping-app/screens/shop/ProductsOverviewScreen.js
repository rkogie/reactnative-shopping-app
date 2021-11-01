import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Platform, ActivityIndicator, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartAction';
import * as productActions from '../../store/actions/productActions';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainButton from '../../components/UI/MainButton';
import Colours from '../../constants/Colours';
import DefaultText from '../../components/UI/DefaultText';


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch], loadProducts);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadProducts)
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);


    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productID: id,
                productTitle: title
            }
        });
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colours.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <DefaultText>No stored products available.</DefaultText>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <DefaultText>An error occured</DefaultText>
                <View style={styles.btnContainer}>
                    <MainButton onButtonPress={loadProducts}>Try Again</MainButton>
                </View>

            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            keyExtractor={item => item.id}
            data={products}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}>

                    <MainButton
                        onButtonPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    >View Details</MainButton>
                    <MainButton
                        onButtonPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    >Add to Cart</MainButton>

                </ProductItem>}
        />
    );
}

ProductsOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Product Range',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }} />
            </HeaderButtons >,
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        padding: 20
    },
})

export default ProductsOverviewScreen;