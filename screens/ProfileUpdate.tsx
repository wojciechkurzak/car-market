import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {StackParamList} from '../App';
import Button from '../components/Button';
import UpdateImage from '../components/UpdateImage';
import {
    darkGray,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../config/context/AuthContext';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

type ProfileUpdateRouteProp = RouteProp<StackParamList, 'Update'>;

const ProfileUpdate = () => {
    const [newImage, setNewImage] = useState<Asset | null>(null);
    const [newUsername, setNewUsername] = useState<string>('');

    const user = useContext(AuthContext);

    const navigation = useNavigation();

    const route = useRoute<ProfileUpdateRouteProp>();
    const {imageUrl, username} = route.params;

    const updateProfile = async (): Promise<void> => {
        await firestore()
            .collection('Users')
            .doc(user!.uid)
            .set({
                username: newUsername ? newUsername : user!.displayName,
                image: newImage ? newImage.fileName : user!.photoURL,
            });
        await storage()
            .ref(`usersImages/${user!.uid}/${newImage!.fileName}`)
            .putFile(newImage!.uri!);

        await auth().currentUser!.updateProfile({
            displayName: newUsername ? newUsername : user!.displayName,
            photoURL: newImage ? newImage.fileName : user!.photoURL,
        });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <UpdateImage
                imageUrl={imageUrl}
                newImage={newImage}
                setNewImage={setNewImage}
            />
            <Text style={styles.tag}>Username</Text>
            <TextInput
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder={username}
                placeholderTextColor={placeholderColor}
                style={styles.input}
            />
            {(newImage || newUsername) && (
                <Button name="Save changes" onPress={updateProfile} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
        paddingHorizontal: 20,
    },
    tag: {
        fontSize: 16,
        marginTop: 20,
        color: textColor,
    },
    input: {
        padding: 0,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: lightGray,
        color: textColor,
    },
});

export default ProfileUpdate;
