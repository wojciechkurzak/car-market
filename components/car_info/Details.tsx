import React from 'react';
import {Text, StyleSheet} from 'react-native';

type DetailsProps = {
    productionDate: string;
    mileage: string;
    fuelType: string;
    displacement: string;
};

const Details = ({
    productionDate,
    mileage,
    fuelType,
    displacement,
}: DetailsProps) => {
    return (
        <Text style={styles.carDetails}>
            {productionDate} - {mileage} km - {fuelType} - {displacement} cm3
        </Text>
    );
};

const styles = StyleSheet.create({
    carDetails: {
        marginTop: 4,
        color: '#ccc',
    },
});

export default Details;
