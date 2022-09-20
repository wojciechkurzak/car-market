import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {HomeStackParamList} from '../screens/HomeScreen';
import NoImage from './NoImage';

type DetailsScreenProp = RouteProp<HomeStackParamList, 'Details'>;

const Details = () => {
    const route = useRoute<DetailsScreenProp>();

    const {
        title,
        image,
        productionDate,
        mileage,
        fuelType,
        displacement,
        price,
        description,
    } = route.params.car;

    return (
        <ScrollView overScrollMode="never">
            <View style={styles.imageContainer}>
                {image ? (
                    <Image style={styles.image} source={{uri: image}} />
                ) : (
                    <NoImage />
                )}
            </View>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.carDetails}>
                    {productionDate} - {mileage} km - {fuelType} -{' '}
                    {displacement} cm3
                </Text>
                <Text style={styles.priceTag}>Price</Text>
                <Text style={styles.price}>{price} PLN</Text>
                <View style={styles.descriptionConatiner}>
                    <Text style={styles.descriptionTag}>Description</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Text style={styles.informationsTag}>Car informations</Text>
                <View style={styles.informationsConatiner}>
                    <View>
                        <Text>Production date</Text>
                        <Text>Mileage</Text>
                        <Text>Displacement</Text>
                        <Text>Fuel type</Text>
                    </View>
                    <View>
                        <Text style={styles.productionDate}>
                            {productionDate}
                        </Text>
                        <Text style={styles.mileage}>{mileage} km</Text>
                        <Text style={styles.displacement}>
                            {displacement} cm3
                        </Text>
                        <Text style={styles.fuelType}>{fuelType}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        paddingHorizontal: 14,
        paddingTop: 10,
    },
    carDetails: {
        marginTop: 4,
        paddingHorizontal: 14,
    },
    priceTag: {
        marginTop: 16,
        paddingHorizontal: 14,
    },
    price: {
        color: '#000',
        fontSize: 26,
        fontWeight: '900',
        lineHeight: 28,
        paddingHorizontal: 14,
    },
    descriptionConatiner: {
        marginTop: 26,
        backgroundColor: '#d5d5d5',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    descriptionTag: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    description: {
        marginTop: 10,
        fontSize: 16,
    },
    informationsTag: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        paddingHorizontal: 14,
        marginTop: 20,
    },
    informationsConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 20,
    },
    productionDate: {textAlign: 'right'},
    mileage: {textAlign: 'right'},
    displacement: {textAlign: 'right'},
    fuelType: {textAlign: 'right'},
});

export default Details;
