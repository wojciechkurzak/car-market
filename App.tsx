import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MyCarsScreen from './screens/MyCarsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SettingsScreen from './screens/SettingsScreens';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName = '';
                        let iconSize;
                        let iconColor = focused
                            ? 'rgba(0, 0, 0, 1.0)'
                            : '#rgba(0, 0, 0, 0.5)';

                        if (route.name === 'Home') {
                            iconName = 'home';
                            iconSize = focused ? 28 : 24;
                        }

                        if (route.name === 'My cars') {
                            iconName = 'car';
                            iconSize = focused ? 22 : 18;
                        }

                        if (route.name === 'Favourites') {
                            iconName = 'star';
                            iconSize = focused ? 26 : 22;
                        }

                        if (route.name === 'Settings') {
                            iconName = 'gear';
                            iconSize = focused ? 26 : 22;
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={iconSize}
                                color={iconColor}
                            />
                        );
                    },
                    tabBarLabel: ({focused, color}) => {
                        let text = '';

                        if (route.name === 'Home') {
                            text = 'Home';
                        }

                        if (route.name === 'My cars') {
                            text = 'My Cars';
                        }

                        if (route.name === 'Favourites') {
                            text = 'Favourites';
                        }

                        if (route.name === 'Settings') {
                            text = 'Settings';
                        }

                        return (
                            <Text
                                style={{
                                    color: focused
                                        ? 'rgba(0, 0, 0, 1.0)'
                                        : 'rgba(0, 0, 0, 0.5)',
                                    fontSize: 12,
                                    marginBottom: 2,
                                }}>
                                {text}
                            </Text>
                        );
                    },
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="My cars" component={MyCarsScreen} />
                <Tab.Screen name="Favourites" component={FavouritesScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
