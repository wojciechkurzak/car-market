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
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        let iconName = '';
                        let iconSize;
                        let iconColor = focused
                            ? 'rgba(0, 0, 0, 1.0)'
                            : '#rgba(0, 0, 0, 0.5)';

                        if (route.name === 'HomeScreen') {
                            iconName = 'home';
                            iconSize = focused ? 28 : 24;
                        }

                        if (route.name === 'MyCarsScreen') {
                            iconName = 'car';
                            iconSize = focused ? 22 : 18;
                        }

                        if (route.name === 'FavouritesScreen') {
                            iconName = 'star';
                            iconSize = focused ? 26 : 22;
                        }

                        if (route.name === 'SettingsScreen') {
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
                    tabBarLabel: ({focused}) => {
                        let text = '';

                        if (route.name === 'HomeScreen') {
                            text = 'Home';
                        }

                        if (route.name === 'MyCarsScreen') {
                            text = 'My Cars';
                        }

                        if (route.name === 'FavouritesScreen') {
                            text = 'Favourites';
                        }

                        if (route.name === 'SettingsScreen') {
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
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="MyCarsScreen" component={MyCarsScreen} />
                <Tab.Screen
                    name="FavouritesScreen"
                    component={FavouritesScreen}
                />
                <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
