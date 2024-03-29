import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getStorage} from '../config/async_storage/asyncStorage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {CarData, CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';
import NoResult from '../components/NoResult';
import {darkGray} from '../config/theme/theme';

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
                                ...(documentSnapshot.data() as CarData),
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
            {favouriteCars.length !== 0 ? (
                <CarList cars={favouriteCars} />
            ) : (
                <NoResult text="No favourites" iconName="star" />
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

export default FavouritesScreen;
