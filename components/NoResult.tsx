import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {iconColor, textColor} from '../config/theme/theme';

type NoResultsProps = {
    text: string;
    iconName: string;
};

const NoResult = ({text, iconName}: NoResultsProps) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={30} color={iconColor} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    text: {
        fontSize: 18,
        color: textColor,
    },
});

export default NoResult;
