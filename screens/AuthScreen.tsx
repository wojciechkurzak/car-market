import React from 'react';
import Login from '../components/Login';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Register from '../components/Register';

const Tab = createMaterialTopTabNavigator();

const AuthScreen = () => {
    return (
        <>
            <Tab.Navigator
                backBehavior="none"
                screenOptions={{
                    swipeEnabled: false,
                    tabBarPressColor: 'transparent',
                }}
                style={{marginTop: 20}}>
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Log in',
                        tabBarLabelStyle: {textTransform: 'none', fontSize: 14},
                    }}
                />
                <Tab.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Register',
                        tabBarLabelStyle: {textTransform: 'none', fontSize: 14},
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default AuthScreen;
