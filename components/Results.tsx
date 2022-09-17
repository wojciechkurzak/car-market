import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {HomeStackParamList} from '../screens/HomeScreen';
import CarList from './CarList';

type ResultssScreenProp = RouteProp<HomeStackParamList, 'Results'>;

const Results = () => {
    const routes = useRoute<ResultssScreenProp>();

    const {cars, filters} = routes.params;

    const filteredCars = cars.filter(
        car =>
            (filters.min?.length === 0 || car.price! >= filters.min!) &&
            (filters.max?.length === 0 || car.price! <= filters.max!),
    );

    return <CarList cars={filteredCars} filter={false} />;
};

export default Results;
