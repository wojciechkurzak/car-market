import React from 'react';
import {
    Asset,
    ImageLibraryOptions,
    launchImageLibrary,
} from 'react-native-image-picker';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import {lightGray, textColor} from '../config/theme/theme';

type UpdateImageProps = {
    imageUrl: string | null;
    newImage: Asset | null;
    setNewImage: (value: Asset) => void;
};

const UpdateImage = ({imageUrl, newImage, setNewImage}: UpdateImageProps) => {
    const openCamera = (): void => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, response => {
            if (
                response.didCancel ||
                response.errorCode ||
                response.assets === undefined
            )
                return;
            else {
                setNewImage(response.assets[0]);
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={openCamera}>
            <View style={styles.imageContainer}>
                {newImage ? (
                    <Image style={styles.image} source={{uri: newImage.uri}} />
                ) : (
                    <>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Update</Text>
                        </View>
                        {imageUrl ? (
                            <Image
                                style={styles.image}
                                source={{uri: imageUrl}}
                            />
                        ) : (
                            <Image
                                style={styles.image}
                                source={require('../assets/defaultIcon.png')}
                            />
                        )}
                    </>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: lightGray,
        marginTop: 16,
        alignSelf: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    textContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    text: {
        fontWeight: '700',
        color: textColor,
    },
});

export default UpdateImage;
