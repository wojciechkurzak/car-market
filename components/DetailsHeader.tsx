import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FavIcon from 'react-native-vector-icons/FontAwesome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../App';
import {getStorage, setStorage} from '../config/async_storage/asyncStorage';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsHeader = () => {
    const [favourite, setFavourite] = useState<boolean>(false);

    const navigation = useNavigation();

    const routes = useRoute<DetailsRouteProp>();

    const getFavouriteId = async (): Promise<void> => {
        const value = await getStorage();
        setFavourite(value.includes(routes.params.car.id));
    };

    const toggleFavourite = async (): Promise<void> => {
        const value = await getStorage();
        const favouritesArray = favourite
            ? value.filter(item => item !== routes.params.car.id)
            : [...value, routes.params.car.id];
        await setStorage(favouritesArray);
        setFavourite(!favourite);
    };

    useEffect(() => {
        getFavouriteId();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={26} color="#fff" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleFavourite}>
                <FavIcon
                    name={favourite ? 'star' : 'star-o'}
                    size={26}
                    color={favourite ? '#ffca28' : '#fff'}
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
