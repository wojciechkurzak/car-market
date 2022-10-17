import React from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet} from 'react-native';

type AuthButtonType = {
    name: string;
    access: Function;
};

const AuthButton = ({name, access}: AuthButtonType) => {
    return (
        <TouchableWithoutFeedback onPress={() => access}>
            <View style={styles.button}>
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: '#55f',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 4,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 34,
        textAlign: 'center',
    },
});

export default AuthButton;
