export interface MinMaxType {
    priceMin: string;
    priceMax: string;
    mileageMin: string;
    mileageMax: string;
    productionDateMin: string;
    productionDateMax: string;
}
export interface FiltersType extends MinMaxType {
    carBrands: string[];
}
