import React from 'react';
import Login from '../components/Login';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import Register from '../components/Register';
import {buttonColor, darkGray, textColor} from '../config/theme/theme';
import {View, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const AuthScreen = () => {
    const navigatorStyle: MaterialTopTabNavigationOptions = {
        tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: 14,
            color: textColor,
        },
        tabBarIndicatorStyle: {
            backgroundColor: buttonColor,
        },
    };

    return (
        <View style={styles.container}>
            <Tab.Navigator
                backBehavior="none"
                screenOptions={{
                    swipeEnabled: false,
                    tabBarPressColor: 'transparent',
                    tabBarStyle: {
                        backgroundColor: darkGray,
                    },
                }}
                style={{marginTop: 20}}>
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        ...navigatorStyle,
                        title: 'Sign in',
                    }}
                />
                <Tab.Screen
                    name="Register"
                    component={Register}
                    options={{
                        ...navigatorStyle,
                        title: 'Register',
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
    },
});

export default AuthScreen;
