import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FavIcon from 'react-native-vector-icons/FontAwesome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../App';
import {getStorage, setStorage} from '../config/async_storage/asyncStorage';
import Animated from 'react-native-reanimated';
import {navigationColor} from '../config/theme/theme';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsHeader = ({animation}: any) => {
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
        <Animated.View style={[styles.container, animation]}>
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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        zIndex: 1,
    },
});

export default DetailsHeader;
