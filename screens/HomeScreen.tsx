import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';
import Details from '../components/Details';
import {Text, View} from 'react-native';

const HomeStack = createStackNavigator();

const HomeScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen
                name="Details"
                component={Details}
                options={{
                    presentation: 'modal',
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeScreen;
