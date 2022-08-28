import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const FavouritesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Favourites!</Text>
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

export default FavouritesScreen;
