import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {textColor} from '../../config/theme/theme';

type InformationsProps = {
    productionDate: string;
    mileage: string;
    fuelType: string;
    displacement: string;
};

const Informations = ({
    productionDate,
    mileage,
    fuelType,
    displacement,
}: InformationsProps) => {
    return (
        <>
            <Text style={styles.informationsTag}>Car informations</Text>
            <View style={styles.informationsConatiner}>
                <View>
                    <Text style={styles.informationLeft}>Production date</Text>
                    <Text style={styles.informationLeft}>Mileage</Text>
                    <Text style={styles.informationLeft}>Displacement</Text>
                    <Text style={styles.informationLeft}>Fuel type</Text>
                </View>
                <View>
                    <Text style={styles.informationRight}>
                        {productionDate}
                    </Text>
                    <Text style={styles.informationRight}>{mileage} km</Text>
                    <Text style={styles.informationRight}>
                        {displacement} cm3
                    </Text>
                    <Text style={styles.informationRight}>{fuelType}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    informationsTag: {
        fontSize: 20,
        fontWeight: '700',
        color: textColor,
    },
    informationsConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    informationRight: {textAlign: 'right', color: '#ccc'},
    informationLeft: {
        color: '#ccc',
    },
});

export default Informations;
