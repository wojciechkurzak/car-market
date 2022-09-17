import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TextInput,
} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import {FiltersType} from '../interfaces/FiltersInterface';
import {HomeStackParamList} from '../screens/HomeScreen';

type ResultsScreenProp = StackNavigationProp<HomeStackParamList, 'Results'>;

const Filters = ({cars}: {cars: CarType[]}) => {
    const [filters, setFilters] = useState<FiltersType>({min: '', max: ''});

    const navigation = useNavigation<ResultsScreenProp>();

    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.priceTag}>Price</Text>
            <View style={styles.priceContainer}>
                <TextInput
                    style={styles.priceInput}
                    value={filters.min}
                    onChangeText={value => setFilters({...filters, min: value})}
                    keyboardType="numeric"
                    placeholder="Min"
                />
                <TextInput
                    style={styles.priceInput}
                    value={filters.max}
                    onChangeText={value => setFilters({...filters, max: value})}
                    keyboardType="numeric"
                    placeholder="Max"
                />
            </View>
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate('Results', {
                        cars: cars,
                        filters: filters,
                    })
                }>
                <View style={styles.showResultContainer}>
                    <Text style={styles.showResult}>Show results</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    priceTag: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    priceInput: {
        width: 170,
        padding: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: '#ddd',
    },
    showResultContainer: {
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    showResult: {
        width: 300,
        backgroundColor: '#55f',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        borderRadius: 6,
        lineHeight: 28,
    },
});

export default Filters;
