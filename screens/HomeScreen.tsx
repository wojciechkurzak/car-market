import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';

const HomeScreen = () => {
    const [cars, setCars] = useState<CarType[]>([]);

    useEffect(() => {
        let carsArray: CarType[] = [];
        const subscriber = firestore()
            .collection('CarOffers')
            .onSnapshot(snapshot => {
                snapshot.forEach(
                    doc =>
                        (carsArray = [
                            ...carsArray,
                            {id: doc.id, ...doc.data()},
                        ]),
                );
                setCars(carsArray);
            });

        return () => subscriber();
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

export default HomeScreen;
