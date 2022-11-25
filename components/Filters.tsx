import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    FlatList,
} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import {FiltersType, MinMaxType} from '../interfaces/FiltersInterface';
import BrandModal from './BrandModal';
import Icon from 'react-native-vector-icons/Feather';
import {StackParamList} from '../App';
import FiltersCheckbox from './FiltersCheckbox';
import {filterInputs} from '../data/filterInputs';
import {
    buttonColor,
    iconColor,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';
import Button from './Button';

type ResultsNavigationProp = StackNavigationProp<StackParamList, 'Results'>;

type FilterInputType = {
    title: string;
    type: string;
    min?: string;
    max?: string;
};

const Filters = ({cars}: {cars: CarType[]}) => {
    const [filters, setFilters] = useState<FiltersType>({
        carBrands: [],
        priceMin: '',
        priceMax: '',
        mileageMin: '',
        mileageMax: '',
        productionDateMin: '',
        productionDateMax: '',
    });
    const [brandModal, setBrandModal] = useState<boolean>(false);

    const navigation = useNavigation<ResultsNavigationProp>();

    const modalItem = (title: string): JSX.Element => (
        <FiltersCheckbox
            title={title}
            filters={filters}
            setFilters={setFilters}
        />
    );

    const renderItem = ({item}: {item: FilterInputType}): JSX.Element => {
        if (item.type !== 'brands')
            return (
                <>
                    <Text style={styles.tag}>{item.title}</Text>
                    <View style={styles.valueContainer}>
                        <TextInput
                            style={styles.valueInput}
                            value={filters[item.min as keyof MinMaxType]}
                            onChangeText={value =>
                                setFilters({...filters, [item.min!]: value})
                            }
                            keyboardType="numeric"
                            placeholder="Min"
                            placeholderTextColor={placeholderColor}
                        />
                        <TextInput
                            style={styles.valueInput}
                            value={filters[item.max as keyof MinMaxType]}
                            onChangeText={value =>
                                setFilters({...filters, [item.max!]: value})
                            }
                            keyboardType="numeric"
                            placeholder="Max"
                            placeholderTextColor={placeholderColor}
                        />
                    </View>
                </>
            );
        else
            return (
                <>
                    <Text style={styles.tag}>Brand</Text>
                    <TouchableWithoutFeedback
                        onPress={() => setBrandModal(true)}>
                        <View style={styles.carBrandContainer}>
                            <Text style={styles.carBrandValues}>
                                {filters.carBrands?.length !== 0
                                    ? filters.carBrands!.map((brand, index) => {
                                          if (index === 0) return brand;
                                          else return `, ${brand}`;
                                      })
                                    : 'Select brands'}
                            </Text>
                            {filters.carBrands?.length === 0 ? (
                                <Icon
                                    style={styles.icon}
                                    name="plus"
                                    size={26}
                                    color={iconColor}
                                />
                            ) : (
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        setFilters({...filters, carBrands: []})
                                    }>
                                    <Icon
                                        style={styles.icon}
                                        name="x"
                                        size={26}
                                        color={iconColor}
                                    />
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </>
            );
    };

    return (
        <>
            <View style={styles.filtersContainer}>
                <FlatList data={filterInputs} renderItem={renderItem} />
                <Button
                    name="Show result"
                    onPress={() =>
                        navigation.navigate('Results', {
                            cars: cars,
                            filters: filters,
                        })
                    }
                />
            </View>
            <BrandModal
                visible={brandModal}
                setVisible={setBrandModal}
                modalItem={modalItem}
            />
        </>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        width: '100%',
        paddingHorizontal: 30,
        marginBottom: 10,
    },
    tag: {
        fontSize: 16,
        color: textColor,
        fontWeight: '500',
        marginTop: 12,
    },
    carBrandContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: lightGray,
    },
    carBrandValues: {
        flex: 1,
        paddingVertical: 8,
        color: textColor,
    },
    icon: {
        alignSelf: 'flex-start',
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
        color: textColor,
        backgroundColor: lightGray,
    },
    showResultContainer: {
        width: 300,
        marginVertical: 20,
        alignSelf: 'center',
    },
    showResult: {
        width: '100%',
        backgroundColor: buttonColor,
        color: textColor,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        borderRadius: 6,
        lineHeight: 28,
    },
});

export default Filters;
