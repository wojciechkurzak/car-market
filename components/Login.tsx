import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import AuthButton from './AuthButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

type LoginFormType = {
    email: string;
    password: string;
};

const Login = () => {
    const [form, setForm] = useState<LoginFormType>({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigation = useNavigation();

    const LogIn = (): void => {
        if (!Object.values(form).some(value => value === '')) {
            auth()
                .signInWithEmailAndPassword(form.email, form.password)
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
        } else {
            setErrorMessage('Inputs cannot be empty');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={form.email}
                onChangeText={value => setForm({...form, email: value})}
                style={styles.input}
                placeholder="E-mail"
            />
            <TextInput
                value={form.password}
                onChangeText={value => setForm({...form, password: value})}
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
