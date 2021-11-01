import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import Colours from '../constants/Colours';
import { useSelector } from 'react-redux';

const FavouritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favouriteMeals);

    if (favMeals.length == 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText style={styles.placeholderText}>
                    Start adding your favourites here!!!
                </DefaultText>
            </View>
        )
    }
    return (
        <MealList
            listData={favMeals}
            navigation={props.navigation} />
    );
}

FavouritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favourites',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons >
    };
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: Colours.placeholderText,
    }
})

export default FavouritesScreen;