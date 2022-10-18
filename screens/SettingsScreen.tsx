import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {StackParamList} from '../App';
import Profile from '../components/Profile';

type SettingsRouteProp = StackNavigationProp<StackParamList, 'AuthPanel'>;

const SettingsScreen = () => {
    const navigation = useNavigation<SettingsRouteProp>();

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

export default SettingsScreen;
