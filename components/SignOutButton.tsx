import React, {useContext} from 'react';
import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import {buttonColor} from '../config/theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../config/context/AuthContext';

const SignOutButton = () => {
    const user = useContext(AuthContext);

    return (
        user && (
            <TouchableNativeFeedback onPress={() => auth().signOut()}>
                <View style={styles.button}>
                    <Icon
                        name="sign-out-alt"
                        color={buttonColor}
                        size={26}
                        style={styles.icon}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 14,
    },
});

export default SignOutButton;
