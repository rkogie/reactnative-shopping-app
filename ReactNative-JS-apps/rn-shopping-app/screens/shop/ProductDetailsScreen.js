import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colours from '../../constants/Colours';
import DefaultText from '../../components/UI/DefaultText';
import MainButton from '../../components/UI/MainButton';
import * as cartActions from '../../store/actions/cartAction';


const ProductDetailsScreen = props => {

    const productID = props.navigation.getParam('productID');
    const selectedProduct = useSelector(state => state.products.availableProducts);
    const displayProduct = selectedProduct.find(prod => prod.id === productID);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: displayProduct.imageURL }} />
            <View style={styles.actions}>
                <MainButton
                    onButtonPress={() => {
                        dispatch(cartActions.addToCart(displayProduct))
                    }}
                >Add to Cart</MainButton>
            </View>
            <DefaultText style={styles.price}>${displayProduct.price.toFixed(2)}</DefaultText>
            <DefaultText style={styles.description}>{displayProduct.description}</DefaultText>
        </ScrollView>

    );
}

ProductDetailsScreen.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle');
    return {
        headerTitle: productTitle,
    };
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: Colours.plainText,
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',

    }
})

export default ProductDetailsScreen;