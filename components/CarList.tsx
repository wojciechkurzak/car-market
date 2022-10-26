import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import CarCard from './CarCard';
import Filters from './Filters';

type CarListType = {
    cars: CarType[];
    filter: boolean;
    refreshControl: JSX.Element;
};

const CarList = ({cars, filter, refreshControl}: CarListType) => {
    const renderItem = ({item}: {item: CarType}) => <CarCard car={item} />;

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
