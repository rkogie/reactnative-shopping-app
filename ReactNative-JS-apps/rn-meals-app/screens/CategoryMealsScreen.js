import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import Colours from '../constants/Colours';

const CategoryMealsScreen = props => {

    const catID = props.navigation.getParam('categoryID');
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayMeals = availableMeals.filter(meal => meal.categoryID.indexOf(catID) >= 0);

    if (displayMeals.length === 0 || !displayMeals) {
        return (
            <View style={styles.content}>
                <DefaultText style={styles.placeholderText}>No meals listed</DefaultText>
                <DefaultText style={styles.placeholderText}>Check filters settings to adjust your preferences</DefaultText>
            </View>
        );
    }

    return (
        <MealList
            listData={displayMeals}
            navigation={props.navigation} />
    );
}

CategoryMealsScreen.navigationOptions = navigationData => {

    const catID = navigationData.navigation.getParam('categoryID');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    return {
        headerTitle: selectedCategory.title
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
    },
})

export default CategoryMealsScreen;