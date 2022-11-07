import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NoResultsProps = {
    text: string;
    iconName: string;
};

const NoResult = ({text, iconName}: NoResultsProps) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={30} color="#555" />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default NoResult;
