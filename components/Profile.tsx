import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {buttonColor, lightGray, textColor} from '../config/theme/theme';

type ProfileProps = {
    imageUrl: string | null;
    username: string;
};

const Profile = ({imageUrl, username}: ProfileProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.pictureContainer}>
                {imageUrl ? (
                    <Image
                        style={styles.profilePicture}
                        source={{uri: imageUrl}}
                    />
                ) : (
                    <Image
                        style={styles.profilePicture}
                        source={require('../assets/defaultIcon.png')}
                    />
                )}
            </View>
            <Text style={styles.profileName}>{username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    pictureContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: lightGray,
        marginVertical: 16,
        shadowColor: buttonColor,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 10,
        overflow: 'hidden',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
    },
    profileName: {
        fontSize: 20,
        color: textColor,
    },
});

export default Profile;
