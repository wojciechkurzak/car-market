import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../utils/AuthContext';
import storage from '@react-native-firebase/storage';

const Profile = () => {
    const [userImageUrl, setUserImageUrl] = useState<string>('');

    const user = useContext(AuthContext);

    console.log(user);

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
