import React from 'react';
import Login from './Login';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Register from './Register';

const Tab = createMaterialTopTabNavigator();

const AuthPanel = () => {
    return (
        <>
            <Tab.Navigator
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

export default AuthPanel;
