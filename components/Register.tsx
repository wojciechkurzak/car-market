import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import Button from './Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {
    darkGray,
    errorColor,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';

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
                placeholderTextColor={placeholderColor}
            />
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
            <TextInput
                value={form.confirmPassword}
                onChangeText={value =>
                    setForm({...form, confirmPassword: value})
                }
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={placeholderColor}
                secureTextEntry={true}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button name="Register" onPress={RegisterAccount} />
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

export default Register;
