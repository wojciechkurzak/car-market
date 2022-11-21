import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import storage from '@react-native-firebase/storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NoImage from './NoImage';
import {StackParamList} from '../App';
import {lightGray, textColor} from '../config/theme/theme';

type DetailsNavigationProp = StackNavigationProp<StackParamList, 'Details'>;

const CarCard = ({car}: {car: CarType}) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const navigation = useNavigation<DetailsNavigationProp>();

    const {
        title,
        mileage,
        fuelType,
        productionDate,
        price,
        image,
        town,
        country,
        displacement,
    } = car;

    const downloadImage = async (): Promise<void> => {
        const imageRef = storage().ref(`carsImages/${image}`);
        const url = await imageRef.getDownloadURL().catch(error => {
            throw error;
        });
        setImageUrl(url);
    };

    useEffect(() => {
        downloadImage();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate('Details', {car: {...car, image: imageUrl}})
            }>
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    {imageUrl ? (
                        <Image style={styles.image} source={{uri: imageUrl}} />
                    ) : (
                        <NoImage />
                    )}
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.bottomInfo}>
                            {productionDate} - {mileage} km - {fuelType} -{' '}
                            {displacement} cm3
                        </Text>
                    </View>
                    <View style={styles.bottomText}>
                        <Text style={styles.price}>{price} PLN</Text>
                        <Text style={styles.address}>
                            {town}, {country}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: 250,
        backgroundColor: lightGray,
        elevation: 4,
        borderRadius: 4,
        marginVertical: 10,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: textColor,
    },
    bottomInfo: {
        color: textColor,
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        color: textColor,
    },
    price: {
        fontWeight: '400',
        fontSize: 16,
        color: textColor,
    },
    address: {
        fontWeight: '400',
        color: textColor,
    },
});

export default CarCard;
