import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
    return (
        <View style={styles.appContainer}>
            <Text>Hello world!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
