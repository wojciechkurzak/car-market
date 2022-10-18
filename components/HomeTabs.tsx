import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from '../screens/SearchScreen';
import MyCarsScreen from '../screens/MyCarsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type BottomTabsParamList = {
    Search: undefined;
    MyCars: undefined;
    Favourites: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const HomeTabs = () => {
    const tabBarData = {
        Search: {
            text: 'Search',
            iconName: 'search',
            defaultSize: 22,
            focusedSize: 26,
        },
        MyCars: {
            text: 'My cars',
            iconName: 'car',
            defaultSize: 18,
            focusedSize: 22,
        },
        Favourites: {
            text: 'Favourites',
            iconName: 'star',
            defaultSize: 22,
            focusedSize: 26,
        },
        Settings: {
            text: 'Settings',
            iconName: 'gear',
            defaultSize: 22,
            focusedSize: 26,
        },
    };

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    const iconName = tabBarData[route.name].iconName;
                    const iconSize = focused
                        ? tabBarData[route.name].focusedSize
                        : tabBarData[route.name].defaultSize;
                    const iconColor = focused
                        ? 'rgba(0, 0, 0, 1.0)'
                        : '#rgba(0, 0, 0, 0.5)';

                    return (
                        <Icon
                            name={iconName}
                            size={iconSize}
                            color={iconColor}
                        />
                    );
                },
                tabBarLabel: ({focused}) => {
                    const text = tabBarData[route.name].text;

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
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="MyCars" component={MyCarsScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default HomeTabs;
