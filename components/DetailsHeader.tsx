import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../App';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsHeader = () => {
    const [favourite, setFavourite] = useState<boolean>(false);

    const navigation = useNavigation();

    const routes = useRoute<DetailsRouteProp>();

    const getStorage = async (): Promise<String[]> => {
        const jsonValue = await AsyncStorage.getItem('@storage_Key').catch(
            error => {
                throw error;
            },
        );
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    };

    const setStorage = async (array: String[]): Promise<void> => {
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(array)).catch(
            error => {
                throw error;
            },
        );
    };

    const getFavourite = async (): Promise<void> => {
        const value = await getStorage();
        setFavourite(value.includes(routes.params.car.id));
    };

    const toggleFavourite = async (): Promise<void> => {
        const value = await getStorage();
        console.log(value);
        const favouritesArray = favourite
            ? value.filter(item => item !== routes.params.car.id)
            : [...value, routes.params.car.id];
        await setStorage(favouritesArray);
        setFavourite(!favourite);
    };

    useEffect(() => {
        getFavourite();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={26} color="#fff" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleFavourite}>
                <Icon
                    name="star"
                    size={26}
                    color={favourite ? '#f00' : '#fff'}
                />
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DetailsHeader;
