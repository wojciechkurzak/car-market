import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {StackParamList} from '../App';
import {darkGray, lightGray} from '../config/theme/theme';
import Title from '../components/car_info/Title';
import Details from '../components/car_info/Details';
import Price from '../components/car_info/Price';
import Description from '../components/car_info/Description';
import Informations from '../components/car_info/Informations';
import About from '../components/car_info/About';
import Contact from '../components/car_info/Contact';
import CarImage from '../components/car_info/CarImage';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsScreen = () => {
    const route = useRoute<DetailsRouteProp>();

    const {
        title,
        image,
        productionDate,
        mileage,
        fuelType,
        displacement,
        price,
        description,
        email,
        phone,
        userId,
    } = route.params.car;

    return (
        <ScrollView overScrollMode="never">
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <CarImage image={image} />
                </View>
                <View style={styles.darkBox}>
                    <Title title={title} />
                    <Details
                        productionDate={productionDate}
                        mileage={mileage}
                        fuelType={fuelType}
                        displacement={displacement}
                    />
                    <Price price={price} />
                </View>
                <View style={styles.lightBox}>
                    <Description description={description} />
                </View>
                <View style={styles.darkBox}>
                    <Informations
                        productionDate={productionDate}
                        mileage={mileage}
                        fuelType={fuelType}
                        displacement={displacement}
                    />
                </View>
                <View style={styles.lightBox}>
                    <About userId={userId} />
                </View>
                <View style={styles.darkBox}>
                    <Contact email={email} phone={phone} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkGray,
    },
    darkBox: {
        padding: 14,
    },
    lightBox: {
        padding: 14,
        backgroundColor: lightGray,
    },
    imageBox: {
        width: '100%',
        height: 220,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default DetailsScreen;
