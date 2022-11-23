import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {lightGray, textColor} from '../../config/theme/theme';

type UserType = FirebaseFirestoreTypes.DocumentData | undefined;

type AboutTypes = {
    userId: string;
};

const About = ({userId}: AboutTypes) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [userImageUrl, setUserImageUrl] = useState<string | null>(null);

    const getUser = async (): Promise<void> => {
        const user = await firestore()
            .collection('Users')
            .doc(userId)
            .get()
            .catch(error => {
                throw error;
            });
        setUser(user.data());
    };

    const downloadUserImage = async (): Promise<void> => {
        if (!user) return;
        const imageRef = storage().ref(`usersImages/${userId}/${user.image}`);
        const url = await imageRef.getDownloadURL().catch(error => {
            throw error;
        });
        setUserImageUrl(url);
    };

    useEffect(() => {
        downloadUserImage();
    }, [user]);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Text style={styles.userTag}>About seller</Text>
            <View style={styles.userContainer}>
                {user && (
                    <>
                        {userImageUrl ? (
                            <Image
                                style={styles.userImage}
                                source={{uri: userImageUrl}}
                            />
                        ) : (
                            <Image
                                style={styles.userImage}
                                source={require('../../assets/defaultIcon.png')}
                            />
                        )}
                        <Text style={styles.username}>{user!.username}</Text>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    userTag: {
        fontSize: 20,
        fontWeight: '700',
        color: textColor,
        backgroundColor: lightGray,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: lightGray,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 18,
    },
    username: {fontSize: 24, color: textColor},
});

export default About;
