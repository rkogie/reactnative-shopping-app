import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colours from '../constants/Colours';
import { Ionicons } from '@expo/vector-icons';


const defaultNavConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colours.primaryColour : 'white',
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans-reg'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primaryColour,
    }
}


const MealsNavigator = createStackNavigator({
    Categories: { screen: CategoriesScreen },
    CategoryMeals: { screen: CategoryMealsScreen },
    MealDetails: { screen: MealDetailsScreen }
}, defaultNavConfig)


const FavNavigator = createStackNavigator({
    Favourites: { screen: FavouritesScreen },
    MealDetails: { screen: MealDetailsScreen }

}, defaultNavConfig)


const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name='ios-restaurant'
                        size={25}
                        color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colours.primaryColour,
            tabBarLabel: Platform.OS === 'android'
                ? < Text style={{ fontFamily: 'open-sans-bold' }}> Meals</Text >
                : 'Meals'
        }
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favourites!',
            tabBarIcon: tabInfo => {
                return <Ionicons
                    name='ios-star'
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colours.accentColour,
            tabBarLabel: Platform.OS === 'android'
                ? < Text style={{ fontFamily: 'open-sans-bold' }}> Favourites</Text >
                : 'Favourites'
        }
    }
}


const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true //false
        ,
        //if you don't want shifting effect, switch to 'false' 
        //and set custom style(below)
        /* barStyle: {
            backgroundColor: Colours.primaryColour,
        } */
    })
    : createBottomTabNavigator(tabScreenConfig,
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colours.accentColour
            }
        }
    )


const FiltersNavigator = createStackNavigator({
    Filters: { screen: FiltersScreen }
}, defaultNavConfig)


const MainNavigator = createDrawerNavigator({
    MealFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filters'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colours.accentColour,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 18,
        }
    }
})


export default createAppContainer(MainNavigator);



