import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import AuthButton from './AuthButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

type RegisterFormType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const [form, setForm] = useState<RegisterFormType>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigation = useNavigation();

    const SetUser = (userUid: string): void => {
        firestore()
            .collection('Users')
            .doc(userUid)
            .set({username: form.username, image: ''});
    };

    const UpdateUsername = (): void => {
        auth()
            .currentUser?.updateProfile({displayName: form.username})
            .then(() => navigation.goBack());
    };

    const RegisterAccount = (): void => {
        if (!Object.values(form).some(value => value === '')) {
            auth()
                .createUserWithEmailAndPassword(form.email, form.password)
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
        } else {
            setErrorMessage('Inputs cannot be empty');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={form.username}
                onChangeText={value => setForm({...form, username: value})}
                style={styles.input}
                placeholder="Username"
            />
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
            <TextInput
                value={form.confirmPassword}
                onChangeText={value =>
                    setForm({...form, confirmPassword: value})
                }
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
