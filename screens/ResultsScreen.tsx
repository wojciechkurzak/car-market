import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StackParamList} from '../App';
import CarList from '../components/CarList';
import NoResult from '../components/NoResult';

type ResultsRouteProp = RouteProp<StackParamList, 'Results'>;

const ResultsScreen = () => {
    const routes = useRoute<ResultsRouteProp>();

    const {cars, filters} = routes.params;

    const filteredCars = cars.filter(
        car =>
            (filters.priceMin.length === 0 ||
                parseInt(car.price!) >= parseInt(filters.priceMin)) &&
            (filters.priceMax.length === 0 ||
                parseInt(car.price!) <= parseInt(filters.priceMax)) &&
            (filters.mileageMin.length === 0 ||
                parseInt(car.mileage!) >= parseInt(filters.mileageMin)) &&
            (filters.mileageMax.length === 0 ||
                parseInt(car.mileage!) <= parseInt(filters.mileageMax)) &&
            (filters.productionDateMin.length === 0 ||
                parseInt(car.productionDate!) >=
                    parseInt(filters.productionDateMin)) &&
            (filters.productionDateMax.length === 0 ||
                parseInt(car.productionDate!) <=
                    parseInt(filters.productionDateMax)) &&
            (filters.carBrands.length === 0 ||
                filters.carBrands.includes(car.carBrand!)),
    );

    return (
        <>
            {filteredCars.length !== 0 ? (
                <CarList cars={filteredCars} filter={false} />
            ) : (
                <NoResult text="No result" iconName="search" />
            )}
        </>
    );
};

export default ResultsScreen;
