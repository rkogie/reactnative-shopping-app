import React from 'react';
import { FlatList, Platform, Alert, View, StyleSheet } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainButton from '../../components/UI/MainButton';
import * as productActions from '../../store/actions/productActions';
import DefaultText from '../../components/UI/DefaultText';
import Colours from '../../constants/Colours';


const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productID: id,
            }
        });
    }

    const deleteHandler = id => {
        Alert.alert('Are you sure?', 'Delete this item from the product library?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id));
                }
            }
        ])
    }

    if (userProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <DefaultText style={styles.text}>You have no products. </DefaultText>
                <DefaultText style={styles.text}>Start adding new products!</DefaultText>
            </View>
        )
    }


    return (
        <FlatList
            keyExtractor={item => item.id}
            data={userProducts}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <MainButton
                        onButtonPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    >Edit</MainButton>
                    <MainButton
                        onButtonPress={deleteHandler.bind(this, itemData.item.id)}
                    >Delete</MainButton>
                </ProductItem>} />
    );
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Product Library',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons >,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'EditProduct'
                        });
                    }} />
            </HeaderButtons >
    };
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colours.plainText
    }
})

export default UserProductsScreen;