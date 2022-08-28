import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MyCarsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>My cars!</Text>
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

export default MyCarsScreen;
