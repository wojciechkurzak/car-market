import React, {useEffect, useState} from 'react';
import {View, StyleSheet, RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';
import {darkGray} from '../config/theme/theme';

const SearchScreen = () => {
    const [cars, setCars] = useState<CarType[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

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

    const onRefresh = async (): Promise<void> => {
        setRefreshing(true);
        await getCars();
        setRefreshing(false);
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <View style={styles.container}>
            {cars.length !== 0 && (
                <CarList
                    cars={cars}
                    filter={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
    },
});

export default SearchScreen;
