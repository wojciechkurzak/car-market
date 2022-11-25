import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {
    darkGray,
    lightGray,
    textColor,
    placeholderColor,
    errorColor,
} from '../config/theme/theme';
import auth from '@react-native-firebase/auth';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../App';

type ReauthenticateRouteProp = RouteProp<StackParamList, 'Reauthenticate'>;

const PasswordUpdateScreen = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigation = useNavigation();
    const route = useRoute<ReauthenticateRouteProp>();

    const updatePassword = (): void => {
        if (!password || !confirmPassword) {
            setError('Inputs cannot be empty');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords should be the same');
            return;
        }

        auth()
            .currentUser!.updatePassword(password)
            .then(() => navigation.goBack())
            .catch(() => setError('Something went wrong'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.tag}>New password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Type here"
                placeholderTextColor={placeholderColor}
                secureTextEntry={true}
                style={styles.input}
            />
            <Text style={styles.tag}>Confirm password</Text>
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Type here"
                placeholderTextColor={placeholderColor}
                secureTextEntry={true}
                style={styles.input}
            />
            <Text style={styles.errorMessage}>{error}</Text>
            <Button name="Change password" onPress={updatePassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 14,
        backgroundColor: darkGray,
    },
    tag: {
        fontSize: 16,
        marginTop: 20,
        color: textColor,
    },
    input: {
        padding: 0,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: lightGray,
        color: textColor,
    },
    errorMessage: {
        marginTop: 4,
        fontSize: 16,
        alignSelf: 'center',
        color: errorColor,
    },
});

export default PasswordUpdateScreen;
