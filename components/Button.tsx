import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';
import {buttonColor, textColor} from '../config/theme/theme';

type ButtonType = {
    name: string;
    onPress: () => void;
};

const Button = ({name, onPress}: ButtonType) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 34,
        backgroundColor: buttonColor,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 4,
    },
    text: {
        color: textColor,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default Button;
