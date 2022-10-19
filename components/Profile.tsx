import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../utils/AuthContext';

const Profile = () => {
    const user = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image
                style={styles.profilePicture}
                source={require('../assets/defaultIcon.png')}
            />
            <Text style={styles.profileName}>{user?.displayName}</Text>
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
