import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StackParamList} from '../App';
import AuthButton from '../components/AuthButton';
import {BottomTabsParamList} from '../components/HomeTabs';
import Profile from '../components/Profile';
import {Text, StyleSheet} from 'react-native';

type AuthPanelNavigationProp = StackNavigationProp<StackParamList, 'AuthPanel'>;

type SettingsRouteProp = RouteProp<BottomTabsParamList, 'Settings'>;

const SettingsScreen = () => {
    const navigation = useNavigation<AuthPanelNavigationProp>();

    const route = useRoute<SettingsRouteProp>();

    return (
        <>
            {route.params.user ? (
                <Profile />
            ) : (
                <>
                    <Text style={styles.authStatus}>You are not logged in</Text>
                    <AuthButton
                        name="Log in"
                        access={() => navigation.navigate('AuthPanel')}
                    />
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    authStatus: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default SettingsScreen;
