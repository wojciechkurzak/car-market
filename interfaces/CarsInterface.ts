export interface CarData {
    title: string;
    description: string;
    mileage: string;
    fuelType: string;
    productionDate: string;
    price: string;
    image: string;
    town: string;
    country: string;
    email: string;
    phone?: string;
    displacement: string;
    carBrand: string;
    userId: string;
}

export interface CarType extends CarData {
    id: string;
}
