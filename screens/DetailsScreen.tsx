import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {StackParamList} from '../App';
import NoImage from '../components/NoImage';
import storage from '@react-native-firebase/storage';
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {darkGray, lightGray, textColor} from '../config/theme/theme';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

type UserType = FirebaseFirestoreTypes.DocumentData | undefined;

const DetailsScreen = () => {
    const [user, setUser] = useState<UserType>(undefined);
    const [userImageUrl, setUserImageUrl] = useState<string>('');

    const route = useRoute<DetailsRouteProp>();

    const {
        title,
        image,
        productionDate,
        mileage,
        fuelType,
        displacement,
        price,
        description,
        email,
        phone,
        userId,
    } = route.params.car;

    const getUser = async (): Promise<void> => {
        const user = await firestore()
            .collection('Users')
            .doc(userId)
            .get()
            .catch(error => {
                throw error;
            });
        setUser(user.data());
    };

    const downloadUserImage = async (): Promise<void> => {
        if (user === undefined || user.image.length === 0) return;
        const imageRef = storage().ref(`usersImages/${userId}/${user.image}`);
        const url = await imageRef.getDownloadURL().catch(error => {
            throw error;
        });
        setUserImageUrl(url);
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        downloadUserImage();
    }, [user]);

    return (
        <ScrollView overScrollMode="never">
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image style={styles.image} source={{uri: image}} />
                    ) : (
                        <NoImage />
                    )}
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.carDetails}>
                        {productionDate} - {mileage} km - {fuelType} -{' '}
                        {displacement} cm3
                    </Text>
                    <Text style={styles.priceTag}>Price</Text>
                    <Text style={styles.price}>{price} PLN</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTag}>Description</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <Text style={styles.informationsTag}>Car informations</Text>
                    <View style={styles.informationsConatiner}>
                        <View>
                            <Text style={styles.informationLeft}>
                                Production date
                            </Text>
                            <Text style={styles.informationLeft}>Mileage</Text>
                            <Text style={styles.informationLeft}>
                                Displacement
                            </Text>
                            <Text style={styles.informationLeft}>
                                Fuel type
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.informationRight}>
                                {productionDate}
                            </Text>
                            <Text style={styles.informationRight}>
                                {mileage} km
                            </Text>
                            <Text style={styles.informationRight}>
                                {displacement} cm3
                            </Text>
                            <Text style={styles.informationRight}>
                                {fuelType}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.userTag}>About seller</Text>
                    {user !== undefined ? (
                        <>
                            <View style={styles.userContainer}>
                                {userImageUrl.length !== 0 ? (
                                    <Image
                                        style={styles.userImage}
                                        source={{uri: userImageUrl}}
                                    />
                                ) : (
                                    <Image
                                        style={styles.userImage}
                                        source={require('../assets/defaultIcon.png')}
                                    />
                                )}
                                <Text style={styles.username}>
                                    {user.username}
                                </Text>
                            </View>
                            <View style={styles.contactContainer}>
                                <View>
                                    {email && (
                                        <Text style={styles.informationLeft}>
                                            Email
                                        </Text>
                                    )}
                                    {phone && (
                                        <Text style={styles.informationLeft}>
                                            Phone
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    {email && (
                                        <Text style={styles.informationRight}>
                                            {email}
                                        </Text>
                                    )}
                                    {phone && (
                                        <Text style={styles.informationRight}>
                                            {phone}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </>
                    ) : null}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkGray,
    },
    imageContainer: {
        width: '100%',
        height: 220,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        paddingHorizontal: 14,
        paddingTop: 10,
        color: textColor,
    },
    carDetails: {
        marginTop: 4,
        paddingHorizontal: 14,
        color: '#ccc',
    },
    priceTag: {
        marginTop: 16,
        paddingHorizontal: 14,
        color: textColor,
    },
    price: {
        fontSize: 26,
        fontWeight: '900',
        lineHeight: 28,
        paddingHorizontal: 14,
        color: textColor,
    },
    descriptionContainer: {
        marginTop: 26,
        backgroundColor: lightGray,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    descriptionTag: {
        fontSize: 20,
        fontWeight: '700',
        color: textColor,
    },
    description: {
        marginTop: 10,
        fontSize: 16,
        color: '#ccc',
    },
    informationsTag: {
        fontSize: 20,
        fontWeight: '700',
        paddingHorizontal: 14,
        marginTop: 20,
        color: textColor,
    },
    informationsConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 20,
    },
    informationRight: {textAlign: 'right', color: '#ccc'},
    informationLeft: {
        color: '#ccc',
    },
    userTag: {
        fontSize: 20,
        fontWeight: '700',
        paddingHorizontal: 14,
        marginTop: 20,
        paddingTop: 10,
        color: textColor,
        backgroundColor: lightGray,
    },
    userContainer: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: lightGray,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 18,
    },
    username: {fontSize: 24, color: textColor},
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default DetailsScreen;
