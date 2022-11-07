import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AddCarScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Hello there</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddCarScreen;
