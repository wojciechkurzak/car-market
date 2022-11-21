import React from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet} from 'react-native';
import {buttonColor, textColor} from '../config/theme/theme';

type AuthButtonType = {
    name: string;
    access: () => void;
};

const AuthButton = ({name, access}: AuthButtonType) => {
    return (
        <TouchableWithoutFeedback onPress={access}>
            <View style={styles.button}>
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: buttonColor,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 4,
    },
    text: {
        color: textColor,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 34,
        textAlign: 'center',
    },
});

export default AuthButton;
