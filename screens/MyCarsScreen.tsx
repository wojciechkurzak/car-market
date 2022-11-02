import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AuthContext} from '../config/context/AuthContext';
import AuthButton from '../components/AuthButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../App';

type AuthPanelNavigationProp = StackNavigationProp<StackParamList, 'Auth'>;

const MyCarsScreen = () => {
    const navigation = useNavigation<AuthPanelNavigationProp>();

    const user = useContext(AuthContext);

    return (
        <>
            {user ? (
                <View style={styles.container}>
                    <Text>My cars!</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.authStatus}>You are not logged in</Text>
                    <AuthButton
                        name="Log in"
                        access={() => navigation.navigate('Auth')}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authStatus: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default MyCarsScreen;
