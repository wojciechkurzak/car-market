import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import Button from './Button';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
    darkGray,
    errorColor,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';

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
                placeholderTextColor={placeholderColor}
            />
            <TextInput
                value={form.password}
                onChangeText={value => setForm({...form, password: value})}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                secureTextEntry={true}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button name="Sign in" onPress={LogIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 14,
        backgroundColor: darkGray,
    },
    input: {
        borderColor: lightGray,
        borderBottomWidth: 2,
        marginBottom: 8,
        color: textColor,
    },
    errorMessage: {
        fontSize: 16,
        alignSelf: 'center',
        color: errorColor,
    },
});

export default Login;
