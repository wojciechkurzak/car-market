import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState, useEffect} from 'react';
import {StackParamList} from '../App';
import Button from '../components/Button';
import Profile from '../components/Profile';
import {Text, StyleSheet, View} from 'react-native';
import {AuthContext} from '../config/context/AuthContext';
import {darkGray, textColor} from '../config/theme/theme';
import storage from '@react-native-firebase/storage';

type AuthPanelNavigationProp = StackNavigationProp<StackParamList, 'Auth'>;

const SettingsScreen = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const navigation = useNavigation<AuthPanelNavigationProp>();

    const user = useContext(AuthContext);

    const downloadUserImage = async (): Promise<void> => {
        if (user === null || user.photoURL === null) return;
        const imageRef = storage().ref(
            `usersImages/${user.uid}/${user.photoURL}`,
        );
        const url = await imageRef.getDownloadURL().catch(error => {
            throw error;
        });
        setImageUrl(url);
    };

    console.log(imageUrl);

    useEffect(() => {
        downloadUserImage();
    }, [user]);

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Profile imageUrl={imageUrl} username={user.displayName!} />
                    <Button
                        name="Update profile"
                        onPress={() =>
                            navigation.navigate('Update', {
                                imageUrl: imageUrl,
                                username: user.displayName!,
                            })
                        }
                    />
                </>
            ) : (
                <>
                    <Text style={styles.authStatus}>You are not logged in</Text>
                    <Button
                        name="Sign in"
                        onPress={() => navigation.navigate('Auth')}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
    },
    authStatus: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 80,
        color: textColor,
    },
});

export default SettingsScreen;
