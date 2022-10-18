import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import AuthButton from './AuthButton';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const LogIn = () => {};

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
            <AuthButton name="Register" access={Register} />
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
});

export default Register;
