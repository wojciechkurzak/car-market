import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {StackParamList} from '../App';
import Icon from 'react-native-vector-icons/Feather';
import {AuthContext} from '../config/context/AuthContext';
import {buttonColor, iconColor} from '../config/theme/theme';

type AddCarNavigationProp = StackNavigationProp<StackParamList, 'Add'>;

const AddCarButton = () => {
    const navigation = useNavigation<AddCarNavigationProp>();

    const user = useContext(AuthContext);

    return (
        user && (
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Add');
                }}>
                <View style={styles.container}>
                    <Icon name="plus" size={28} color={iconColor} />
                </View>
            </TouchableWithoutFeedback>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: buttonColor,
        borderRadius: 50,
        marginHorizontal: 14,
    },
});

export default AddCarButton;
