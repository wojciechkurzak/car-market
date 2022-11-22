import React, {useContext, useCallback, useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AuthContext} from '../config/context/AuthContext';
import Button from '../components/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../App';
import firestore from '@react-native-firebase/firestore';
import {CarType} from '../interfaces/CarsInterface';
import CarList from '../components/CarList';
import NoResult from '../components/NoResult';
import {darkGray, textColor} from '../config/theme/theme';

type AddCarNavigationProp = StackNavigationProp<StackParamList, 'Add'>;

const MyCarsScreen = () => {
    const [myCars, setMyCars] = useState<CarType[]>([]);

    const navigation = useNavigation<AddCarNavigationProp>();

    const user = useContext(AuthContext);

    const getMyCars = (): any => {
        if (!user) return;
        let carsArray: CarType[] = [];
        firestore()
            .collection('CarOffers')
            .where('userId', '==', user.uid)
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
                setMyCars(carsArray);
            })
            .catch(error => {
                throw error;
            });
    };

    useFocusEffect(
        useCallback(() => {
            getMyCars();
        }, [user]),
    );

    return (
        <>
            {user ? (
                <View style={styles.container}>
                    {myCars.length !== 0 ? (
                        <CarList cars={myCars} filter={false} />
                    ) : (
                        <NoResult
                            text="No listed cars"
                            iconName="format-list-bulleted"
                        />
                    )}
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.authStatus}>You are not logged in</Text>
                    <Button
                        name="Sign in"
                        onPress={() => navigation.navigate('Auth')}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGray,
    },
    authStatus: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 80,
        color: textColor,
    },
});

export default MyCarsScreen;
