import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import AuthButton from './AuthButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from './HomeTabs';

type SettingsNavigationProp = BottomTabNavigationProp<
    BottomTabsParamList,
    'Settings'
>;

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigation = useNavigation<SettingsNavigationProp>();

    const SetUser = (userUid: string): void => {
        firestore()
            .collection('Users')
            .doc(userUid)
            .set({username: username, image: ''});
    };

    const UpdateUsername = (): void => {
        auth()
            .currentUser?.updateProfile({displayName: username})
            .then(() => navigation.navigate('Settings'));
    };

    const RegisterAccount = (): void => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => SetUser(user.user.uid))
            .then(() => UpdateUsername())
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('E-mail address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    setErrorMessage('E-mail address is invalid!');
                }
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholder="Username"
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="E-mail"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry={true}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <AuthButton name="Register" access={RegisterAccount} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    input: {
        borderColor: '#666',
        borderBottomWidth: 2,
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 16,
        color: '#f00',
        alignSelf: 'center',
    },
});

export default Register;
