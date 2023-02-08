import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import ArrowIcon from 'react-native-vector-icons/FontAwesome5';
import FavIcon from 'react-native-vector-icons/FontAwesome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../App';
import {getStorage, setStorage} from '../config/async_storage/asyncStorage';
import Animated from 'react-native-reanimated';
import {deleteColor, iconColor, navigationColor} from '../config/theme/theme';
import ItemDeleteModal from './ItemDeleteModal';
import {CarType} from '../interfaces/CarsInterface';
import {StackNavigationProp} from '@react-navigation/stack';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;
type EditNavigationProp = StackNavigationProp<StackParamList, 'Edit'>;

type DetailsHeaderProps = {
    car: CarType;
    edit: boolean;
    animation: any;
};

const DetailsHeader = ({car, edit, animation}: DetailsHeaderProps) => {
    const [favourite, setFavourite] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const navigation = useNavigation<EditNavigationProp>();

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
        <>
            <Animated.View style={[styles.container, animation]}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <ArrowIcon
                        name="arrow-left"
                        size={26}
                        color="#fff"
                        style={styles.icon}
                    />
                </TouchableWithoutFeedback>
                {edit ? (
                    <View style={styles.editIcons}>
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate('Edit', {car: car})
                            }>
                            <EditIcon
                                name="edit"
                                size={24}
                                color={iconColor}
                                style={styles.icon}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => setDeleteModal(true)}>
                            <EditIcon
                                name="delete"
                                size={26}
                                color={deleteColor}
                                style={styles.icon}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                ) : (
                    <TouchableWithoutFeedback onPress={toggleFavourite}>
                        <FavIcon
                            name={favourite ? 'star' : 'star-o'}
                            size={26}
                            color={favourite ? '#ffca28' : iconColor}
                            style={styles.icon}
                        />
                    </TouchableWithoutFeedback>
                )}
            </Animated.View>
            <ItemDeleteModal
                itemId={car.id}
                visible={deleteModal}
                setVisible={setDeleteModal}
            />
        </>
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
    editIcons: {
        width: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        borderRadius: 50,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: navigationColor,
    },
});

export default DetailsHeader;
