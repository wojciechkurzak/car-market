import {KeyboardTypeOptions} from 'react-native';

export type CarInputType = {
    type: string;
    placeholder: string;
    length: number;
    keyboardType: KeyboardTypeOptions;
    multiline?: boolean;
    numberOfLines?: number;
};

export const carAddInputs: CarInputType[] = [
    {
        type: 'title',
        placeholder: 'Title',
        length: 60,
        keyboardType: 'default',
    },
    {
        type: 'brand',
        placeholder: 'Brand',
        length: 60,
        keyboardType: 'default',
    },
    {
        type: 'price',
        placeholder: 'Price',
        length: 20,
        keyboardType: 'numeric',
    },
    {
        type: 'description',
        placeholder: 'Description',
        length: 500,
        keyboardType: 'default',
        multiline: true,
        numberOfLines: 4,
    },
    {
        type: 'productionDate',
        placeholder: 'Production date',
        length: 4,
        keyboardType: 'numeric',
    },
    {
        type: 'mileage',
        placeholder: 'Mileage',
        length: 10,
        keyboardType: 'numeric',
    },
    {
        type: 'displacement',
        placeholder: 'Displacement',
        length: 5,
        keyboardType: 'numeric',
    },
    {
        type: 'fuelType',
        placeholder: 'Fuel type',
        length: 20,
        keyboardType: 'default',
    },
    {
        type: 'country',
        placeholder: 'Country',
        length: 60,
        keyboardType: 'default',
    },
    {
        type: 'town',
        placeholder: 'Town',
        length: 60,
        keyboardType: 'default',
    },
    {
        type: 'email',
        placeholder: 'Email',
        length: 60,
        keyboardType: 'default',
    },
    {
        type: 'phone',
        placeholder: 'Phone',
        length: 9,
        keyboardType: 'numeric',
    },
];
