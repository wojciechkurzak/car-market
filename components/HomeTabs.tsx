import React from 'react';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from '../screens/SearchScreen';
import MyCarsScreen from '../screens/MyCarsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddCarButton from './AddCarButton';
import {navigationColor, textColor} from '../config/theme/theme';

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
            iconColor: '#eb1555',
            defaultSize: 20,
            focusedSize: 24,
        },
        MyCars: {
            text: 'My cars',
            iconName: 'car',
            iconColor: '#5d32b9',
            defaultSize: 18,
            focusedSize: 22,
        },
        Favourites: {
            text: 'Favourites',
            iconName: 'star',
            iconColor: '#ffca28',
            defaultSize: 20,
            focusedSize: 24,
        },
        Settings: {
            text: 'Settings',
            iconName: 'gear',
            iconColor: '#3250B9',
            defaultSize: 20,
            focusedSize: 24,
        },
    };

    const tabStyles: BottomTabNavigationOptions = {
        headerStyle: {
            backgroundColor: navigationColor,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTitleStyle: {
            color: textColor,
        },
    };

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: navigationColor,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarIcon: ({focused}) => {
                    const iconName = tabBarData[route.name].iconName;
                    const iconSize = focused
                        ? tabBarData[route.name].focusedSize
                        : tabBarData[route.name].defaultSize;
                    const iconColor = focused
                        ? tabBarData[route.name].iconColor
                        : 'rgba(255, 255, 255, 0.5)';

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
                                    ? 'rgba(255, 255, 255, 1.0)'
                                    : 'rgba(255, 255, 255, 0.5)',
                                fontSize: 12,
                                marginBottom: 2,
                            }}>
                            {text}
                        </Text>
                    );
                },
            })}>
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    ...tabStyles,
                }}
            />
            <Tab.Screen
                name="MyCars"
                component={MyCarsScreen}
                options={{
                    ...tabStyles,
                    headerTitle: 'My cars',
                    headerRight: () => <AddCarButton />,
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{
                    ...tabStyles,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    ...tabStyles,
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeTabs;
