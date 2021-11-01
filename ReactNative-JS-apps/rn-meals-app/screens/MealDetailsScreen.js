import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/actions/mealActions';


const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = props => {

    const mealID = props.navigation.getParam('mealID');
    const availableMeals = useSelector(state => state.meals.meals);
    const isCurrentFavMeal = useSelector(
        state => state.meals.favouriteMeals.some(
            meal => meal.id === mealID
        ));

    const selectedMeal = availableMeals.find(meal => meal.id === mealID);

    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealID));
    }, [dispatch, mealID]);


    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
    }, [toggleFavouriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: isCurrentFavMeal });
    }, [isCurrentFavMeal])

    return (
        <ScrollView>
            <Image
                source={{ uri: selectedMeal.imageURL }}
                style={styles.image} />

            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>

            {selectedMeal.ingredients.map(ingredient =>
                <ListItem key={ingredient}>{ingredient}</ListItem>)}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>
                <ListItem key={step}>{step}</ListItem>)}



            {/* <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button title='Home' onPress={() => {
                props.navigation.popToTop();
                //props.navigation.navigate('Categories')
            }} />
            </View> */}
        </ScrollView>
    );
}


MealDetailsScreen.navigationOptions = navigationData => {
    //const mealID = navigationData.navigation.getParam('mealID');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavourite = navigationData.navigation.getParam('toggleFav');
    const isFavourite = navigationData.navigation.getParam('isFav');
    //const selectedMeal = MEALS.find(meal => meal.id === mealID);

    return {
        headerTitle: mealTitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favourite'
                    iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavourite} />
            </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
    }
})

export default MealDetailsScreen;