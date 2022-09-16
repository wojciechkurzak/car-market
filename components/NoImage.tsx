import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NoImage = () => {
    return (
        <View style={styles.container}>
            <Icon style={styles.image} name="image" size={30} />
            <Text style={styles.text}>No image</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        color: '#888',
    },
    text: {
        color: '#888',
    },
});

export default NoImage;
