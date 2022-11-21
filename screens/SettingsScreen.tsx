import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {StackParamList} from '../App';
import AuthButton from '../components/AuthButton';
import Profile from '../components/Profile';
import {Text, StyleSheet, View} from 'react-native';
import {AuthContext} from '../config/context/AuthContext';
import auth from '@react-native-firebase/auth';
import {darkGray, textColor} from '../config/theme/theme';

type AuthPanelNavigationProp = StackNavigationProp<StackParamList, 'Auth'>;

const SettingsScreen = () => {
    const navigation = useNavigation<AuthPanelNavigationProp>();

    const user = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Profile />
                    <AuthButton
                        name="Sign out"
                        access={() => auth().signOut()}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.authStatus}>You are not logged in</Text>
                    <AuthButton
                        name="Sign in"
                        access={() => navigation.navigate('Auth')}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
    },
    authStatus: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 80,
        color: textColor,
    },
});

export default SettingsScreen;
