import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {HomeStackParamList} from '../screens/HomeScreen';
import NoImage from './NoImage';

type DetailsScreenProp = RouteProp<HomeStackParamList, 'Details'>;

const Details = () => {
    const route = useRoute<DetailsScreenProp>();

    const {title, image, productionDate, mileage, engine, price} =
        route.params.car;

    return (
        <View>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image style={styles.image} source={{uri: image}} />
                ) : (
                    <NoImage />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.carDetails}>
                    {productionDate} - {mileage} - {engine}
                </Text>
                <Text style={styles.price}>{price} PLN</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 220,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    textContainer: {
        padding: 10,
        paddingHorizontal: 14,
    },
    carDetails: {
        marginTop: 4,
    },
    price: {
        color: '#f00',
        fontSize: 24,
        fontWeight: '700',
    },
});

export default Details;
