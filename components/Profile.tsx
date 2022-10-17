import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profilePicture}></View>
            <Text style={styles.profileName}>Profile name</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    profilePicture: {
        width: 150,
        height: 150,
        backgroundColor: '#000',
        borderRadius: 100,
        marginVertical: 16,
    },
    profileName: {
        fontSize: 20,
        color: '#000',
    },
});

export default Profile;
