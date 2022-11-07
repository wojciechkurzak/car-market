import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getStorage} from '../config/async_storage/asyncStorage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';

const FavouritesScreen = () => {
    const [favouriteCars, setFavouriteCars] = useState<CarType[]>([]);

    const getFavouriteCars = (id: String[]) => {
        let carsArray: CarType[] = [];
        firestore()
            .collection('CarOffers')
            .where(firebase.firestore.FieldPath.documentId(), 'in', id)
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
                setFavouriteCars(carsArray);
            })
            .catch(error => {
                throw error;
            });
    };

    const getFavourite = async (): Promise<void> => {
        const value = await getStorage();
        if (value.length !== 0) {
            getFavouriteCars(value);
        } else {
            setFavouriteCars([]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getFavourite();
        }, []),
    );

    return (
        <View style={styles.container}>
            <CarList cars={favouriteCars} filter={false} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FavouritesScreen;
