import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import AuthButton from './AuthButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigation = useNavigation();

    const LogIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.goBack())
            .catch(error => {
                if (
                    error.code === 'auth/user-not-found' ||
                    error.code === 'auth/invalid-email' ||
                    error.code === 'auth/wrong-password'
                )
                    setErrorMessage('Invalid e-mail or password');
                else setErrorMessage('Something went wrong');
            });
    };

    return (
        <View style={styles.container}>
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
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <AuthButton name="Log in" access={LogIn} />
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

export default Login;
