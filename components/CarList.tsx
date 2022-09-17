import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import CarCard from './CarCard';
import Filters from './Filters';

const CarList = ({cars, filter}: {cars: CarType[]; filter: boolean}) => {
    const renderItem = ({item}: {item: CarType}) => <CarCard car={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={cars}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                overScrollMode={'never'}
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
