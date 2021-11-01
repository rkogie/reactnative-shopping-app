import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';


const MealList = props => {

    const favouriteMeals = useSelector(state => state.meals.favouriteMeals)

    const renderMealItem = itemData => {
        const isFavourite = favouriteMeals.some(meal => meal.id === itemData.item.id)

        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageURL}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}

                //Navigation function on custom press
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetails',
                        params: {
                            mealID: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavourite
                        }
                    })
                }} />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList
                style={styles.listContainer}
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={renderMealItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listContainer: {
        width: '100%',
    }
})

export default MealList;