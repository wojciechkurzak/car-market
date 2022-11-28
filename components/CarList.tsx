import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import CarCard from './CarCard';
import Filters from './Filters';

type CarListType = {
    cars: CarType[];
    filter?: boolean;
    edit?: boolean;
    refreshControl?: JSX.Element;
};

const CarList = ({
    cars,
    filter = false,
    edit = false,
    refreshControl,
}: CarListType) => {
    const renderItem = ({item}: {item: CarType}) => (
        <CarCard car={item} edit={edit} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cars}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                overScrollMode={'never'}
                refreshControl={refreshControl}
                ListHeaderComponent={filter ? <Filters cars={cars} /> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default CarList;
