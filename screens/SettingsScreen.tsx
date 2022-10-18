import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StackParamList} from '../App';
import AuthButton from '../components/AuthButton';
import {BottomTabsParamList} from '../components/HomeTabs';
import Profile from '../components/Profile';

type AuthPanelNavigationProp = StackNavigationProp<StackParamList, 'AuthPanel'>;

type SettingsRouteProp = RouteProp<BottomTabsParamList, 'Settings'>;

const SettingsScreen = () => {
    const navigation = useNavigation<AuthPanelNavigationProp>();

    const route = useRoute<SettingsRouteProp>();

    return (
        <>
            <Profile />
            <AuthButton
                name="Log in"
                access={() => navigation.navigate('AuthPanel')}
            />
        </>
    );
};

export default SettingsScreen;
