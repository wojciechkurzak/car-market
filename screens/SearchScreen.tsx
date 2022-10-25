import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';

const SearchScreen = () => {
    const [cars, setCars] = useState<CarType[]>([]);

    const getCars = async (): Promise<void> => {
        let carsArray: CarType[] = [];
        await firestore()
            .collection('CarOffers')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(
                    documentSnapshot =>
                        (carsArray = [
                            ...carsArray,
                            {
                                id: documentSnapshot.id,
                                ...documentSnapshot.data(),
                            },
                        ]),
                );
            })
            .catch(error => {
                throw error;
            });
        setCars(carsArray);
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <View style={styles.container}>
            {cars.length !== 0 && <CarList cars={cars} filter={true} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SearchScreen;
