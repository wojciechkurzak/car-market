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
            (filters.priceMin?.length === 0 ||
                car.price! >= filters.priceMin!) &&
            (filters.priceMax?.length === 0 ||
                car.price! <= filters.priceMax!) &&
            (filters.mileageMin?.length === 0 ||
                car.mileage! >= filters.mileageMin!) &&
            (filters.mileageMax?.length === 0 ||
                car.mileage! <= filters.mileageMax!) &&
            (filters.mileageMin?.length === 0 ||
                car.productionDate! >= filters.productionDateMin!) &&
            (filters.mileageMax?.length === 0 ||
                car.productionDate! <= filters.productionDateMax!) &&
            (filters.carBrands?.length === 0 ||
                filters.carBrands!.includes(car.carBrand!)),
    );

    return <CarList cars={filteredCars} filter={false} />;
};

export default Results;
