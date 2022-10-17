import {useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthPanel from '../components/AuthPanel';
import Settings from '../components/Settings';

export type SettingsStackParamList = {
    Settings: undefined;
    AuthPanel: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsScreen = () => {
    const routes = useRoute();

    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={Settings} />
            <SettingsStack.Screen
                name="AuthPanel"
                component={AuthPanel}
                options={{
                    presentation: 'modal',
                    title: 'Log in',
                    cardStyle: {backgroundColor: '#fff'},
                }}
            />
        </SettingsStack.Navigator>
    );
};

export default SettingsScreen;
