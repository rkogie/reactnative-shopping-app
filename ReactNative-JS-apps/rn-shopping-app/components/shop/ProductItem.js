import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import DefaultText from '../UI/DefaultText';
import Colours from '../../constants/Colours';
import Card from '../UI/Card';

const ProductItem = props => {

    let TouchableProduct = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableProduct = TouchableNativeFeedback;
    }

    return (

        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableProduct onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: props.image }} />
                        </View>
                        <View style={styles.detailsContainer}>
                            <DefaultText style={styles.title}>{props.title}</DefaultText>
                            <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableProduct>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    product: {
        flex: 1,
        height: 300,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: Colours.priceText,
        fontFamily: 'open-sans-bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },
    detailsContainer: {
        alignItems: 'center',
        height: '17%',
        padding: 2,

    }
})

export default ProductItem;