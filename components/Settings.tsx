import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {SettingsStackParamList} from '../screens/SettingsScreens';
import Profile from './Profile';

type SettingsScreenProp = StackNavigationProp<
    SettingsStackParamList,
    'AuthPanel'
>;

const Settings = () => {
    const navigation = useNavigation<SettingsScreenProp>();

    return (
        <>
            <Profile />
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('AuthPanel')}>
                <View>
                    <Text>Log in</Text>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default Settings;
