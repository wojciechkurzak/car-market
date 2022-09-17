import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {CarType} from '../interfaces/CarsInterface';
import storage from '@react-native-firebase/storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../screens/HomeScreen';
import NoImage from './NoImage';

type DetailsScreenProp = StackNavigationProp<HomeStackParamList, 'Details'>;

const CarCard = ({car}: {car: CarType}) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const navigation = useNavigation<DetailsScreenProp>();

    const {
        title,
        mileage,
        fuelType,
        productionDate,
        price,
        image,
        town,
        country,
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
                        <Text>
                            {productionDate} - {mileage} km - {fuelType}
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
        backgroundColor: '#fff',
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
        color: '#000',
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        color: '#000',
    },
    price: {
        color: '#000',
        fontWeight: '400',
        fontSize: 16,
    },
    address: {
        color: '#000',
        fontWeight: '400',
    },
});

export default CarCard;
