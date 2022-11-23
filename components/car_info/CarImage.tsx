import React from 'react';
import NoImage from '../../components/NoImage';
import {Image, StyleSheet} from 'react-native';

type CarImageProps = {
    image: string;
};

const CarImage = ({image}: CarImageProps) => {
    return image ? (
        <Image style={styles.image} source={{uri: image}} />
    ) : (
        <NoImage />
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});

export default CarImage;
