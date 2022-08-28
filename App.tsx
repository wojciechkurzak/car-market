import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MyCarsScreen from './screens/MyCarsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SettingsScreen from './screens/SettingsScreens';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="My cars" component={MyCarsScreen} />
                <Tab.Screen name="Favourites" component={FavouritesScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
