import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../config/context/AuthContext';
import storage from '@react-native-firebase/storage';
import {buttonColor, lightGray, textColor} from '../config/theme/theme';

const Profile = () => {
    const [userImageUrl, setUserImageUrl] = useState<string>('');

    const user = useContext(AuthContext);

    const downloadUserImage = async (): Promise<void> => {
        if (user === null || user.photoURL === null) return;
        const imageRef = storage().ref(
            `usersImages/${user.uid}/${user.photoURL}`,
        );
        const url = await imageRef.getDownloadURL().catch(error => {
            throw error;
        });
        setUserImageUrl(url);
    };

    useEffect(() => {
        downloadUserImage();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.pictureContainer}>
                {userImageUrl.length !== 0 ? (
                    <Image
                        style={styles.profilePicture}
                        source={{uri: userImageUrl}}
                    />
                ) : (
                    <Image
                        style={styles.profilePicture}
                        source={require('../assets/defaultIcon.png')}
                    />
                )}
            </View>
            <Text style={styles.profileName}>{user?.displayName}</Text>
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
