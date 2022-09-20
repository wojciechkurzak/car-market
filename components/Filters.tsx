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
    const [filters, setFilters] = useState<FiltersType>({
        priceMin: '',
        priceMax: '',
        mileageMin: '',
        mileageMax: '',
        productionDateMin: '',
        productionDateMax: '',
    });

    const navigation = useNavigation<ResultsScreenProp>();

    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.tag}>Price</Text>
            <View style={styles.valueContainer}>
                <TextInput
                    style={styles.valueInput}
                    value={filters.priceMin}
                    onChangeText={value =>
                        setFilters({...filters, priceMin: value})
                    }
                    keyboardType="numeric"
                    placeholder="Min"
                />
                <TextInput
                    style={styles.valueInput}
                    value={filters.priceMax}
                    onChangeText={value =>
                        setFilters({...filters, priceMax: value})
                    }
                    keyboardType="numeric"
                    placeholder="Max"
                />
            </View>
            <Text style={styles.tag}>Mileage</Text>
            <View style={styles.valueContainer}>
                <TextInput
                    style={styles.valueInput}
                    value={filters.mileageMin}
                    onChangeText={value =>
                        setFilters({...filters, mileageMin: value})
                    }
                    keyboardType="numeric"
                    placeholder="Min"
                />
                <TextInput
                    style={styles.valueInput}
                    value={filters.mileageMax}
                    onChangeText={value =>
                        setFilters({...filters, mileageMax: value})
                    }
                    keyboardType="numeric"
                    placeholder="Max"
                />
            </View>
            <Text style={styles.tag}>Production Date</Text>
            <View style={styles.valueContainer}>
                <TextInput
                    style={styles.valueInput}
                    value={filters.productionDateMin}
                    onChangeText={value =>
                        setFilters({...filters, productionDateMin: value})
                    }
                    keyboardType="numeric"
                    placeholder="Min"
                />
                <TextInput
                    style={styles.valueInput}
                    value={filters.productionDateMax}
                    onChangeText={value =>
                        setFilters({...filters, productionDateMax: value})
                    }
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
    tag: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginTop: 12,
    },
    valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    valueInput: {
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