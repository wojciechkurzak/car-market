export type FilterInputType = {
    title: string;
    type: string;
    min?: string;
    max?: string;
};

export const filterInputs: FilterInputType[] = [
    {
        title: 'Car brands',
        type: 'brands',
    },
    {
        title: 'Price',
        type: 'price',
        min: 'priceMin',
        max: 'priceMax',
    },
    {
        title: 'Mileage',
        type: 'mileage',
        min: 'mileageMin',
        max: 'mileageMax',
    },
    {
        title: 'Production date',
        type: 'productionDate',
        min: 'productionDateMin',
        max: 'productionDateMax',
    },
];
