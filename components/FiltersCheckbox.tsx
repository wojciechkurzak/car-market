import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FiltersType} from '../interfaces/FiltersInterface';

type FiltersCheckboxType = {
    title: string;
    filters: FiltersType;
    setFilters: Function;
};

const FiltersCheckbox = ({title, filters, setFilters}: FiltersCheckboxType) => {
    const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(
        filters.carBrands!.includes(title),
    );

    return (
        <View style={styles.container}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={value => {
                    const filteredCarBrands = value
                        ? [...filters.carBrands!, title]
                        : [...filters.carBrands!].filter(
                              brand => brand !== title,
                          );
                    setFilters({
                        ...filters,
                        carBrands: filteredCarBrands,
                    });
                    setToggleCheckBox(value);
                }}
            />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    text: {
        color: '#000',
        marginHorizontal: 8,
    },
});

export default FiltersCheckbox;
