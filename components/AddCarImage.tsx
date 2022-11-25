import React from 'react';
import {
    Asset,
    ImageLibraryOptions,
    launchImageLibrary,
} from 'react-native-image-picker';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {iconColor, lightGray, textColor} from '../config/theme/theme';

type AddCarImageProps = {
    image: Asset | null;
    setImage: (value: Asset) => void;
};

const AddCarImage = ({image, setImage}: AddCarImageProps) => {
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
                setImage(response.assets[0]);
            }
        });
    };
    return (
        <View style={styles.container}>
            {image ? (
                <TouchableWithoutFeedback onPress={openCamera}>
                    <Image source={{uri: image.uri}} style={styles.image} />
                </TouchableWithoutFeedback>
            ) : (
                <TouchableWithoutFeedback onPress={openCamera}>
                    <View style={styles.addImageContainer}>
                        <Icon name="plus" size={26} color={iconColor} />
                        <Text style={{color: textColor}}>Add image</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 12,
    },
    addImageContainer: {
        width: 150,
        height: 100,
        borderRadius: 8,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray,
    },
    image: {
        height: 200,
        aspectRatio: 16 / 9,
        borderRadius: 8,
    },
});

export default AddCarImage;
