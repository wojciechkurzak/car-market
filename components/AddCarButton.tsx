import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {StackParamList} from '../App';
import Icon from 'react-native-vector-icons/Feather';

type AddCarNavigationProp = StackNavigationProp<StackParamList, 'Add'>;

const AddCarButton = () => {
    const navigation = useNavigation<AddCarNavigationProp>();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('Add');
            }}>
            <View style={styles.container}>
                <Icon name="plus" size={28} color="#000" />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 14,
    },
});

export default AddCarButton;
