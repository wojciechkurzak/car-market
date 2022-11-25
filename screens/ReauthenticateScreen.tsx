import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
    darkGray,
    errorColor,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import {AuthRouteNames, StackParamList} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

type AuthNavigationProps = StackNavigationProp<StackParamList, AuthRouteNames>;

type ReauthenticateScreenRouteProps = RouteProp<
    StackParamList,
    'Reauthenticate'
>;

const ReauthenticateScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigation = useNavigation<AuthNavigationProps>();
    const route = useRoute<ReauthenticateScreenRouteProps>();
    const {routeName} = route.params;

    const reauthenticate = (): void => {
        if (!email || !password) {
            setError('Inputs cannot be empty');
            return;
        }
        const provider = firebase.auth.EmailAuthProvider;
        const authCredential = provider.credential(email, password);
        auth()
            .currentUser!.reauthenticateWithCredential(authCredential)
            .then(() =>
                navigation.replace(routeName, {
                    authCredential: authCredential,
                }),
            )
            .catch(() => setError('Invalid e-mail or password'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.tag}>E-mail</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Type here"
                placeholderTextColor={placeholderColor}
            />
            <Text style={styles.tag}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setpassword}
                style={styles.input}
                placeholder="Type here"
                placeholderTextColor={placeholderColor}
                secureTextEntry={true}
            />
            <Text style={styles.errorMessage}>{error}</Text>
            <Button name="Sign in" onPress={reauthenticate} />
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

export default ReauthenticateScreen;
