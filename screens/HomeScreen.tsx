import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CarCard from '../components/CarCard';
import {CarType} from '../interfaces/CarsInterface';

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
            {cars.map(car => (
                <CarCard key={car.id} data={car} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
