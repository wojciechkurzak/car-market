import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {StackParamList} from '../App';
import NoImage from '../components/NoImage';
import storage from '@react-native-firebase/storage';
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

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
                <View style={styles.descriptionConatiner}>
                    <Text style={styles.descriptionTag}>Description</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Text style={styles.informationsTag}>Car informations</Text>
                <View style={styles.informationsConatiner}>
                    <View>
                        <Text>Production date</Text>
                        <Text>Mileage</Text>
                        <Text>Displacement</Text>
                        <Text>Fuel type</Text>
                    </View>
                    <View>
                        <Text style={styles.information}>{productionDate}</Text>
                        <Text style={styles.information}>{mileage} km</Text>
                        <Text style={styles.information}>
                            {displacement} cm3
                        </Text>
                        <Text style={styles.information}>{fuelType}</Text>
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
                            <Text style={styles.username}>{user.username}</Text>
                        </View>
                        <View style={styles.contactContainer}>
                            <View>
                                {user.contactEmail && <Text>Email</Text>}
                                {user.contactPhone && <Text>Phone</Text>}
                            </View>
                            <View>
                                {user.contactEmail && (
                                    <Text style={styles.information}>
                                        {user.contactEmail}
                                    </Text>
                                )}
                                {user.contactPhone && (
                                    <Text style={styles.information}>
                                        {user.contactPhone}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </>
                ) : null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
        color: '#000',
        paddingHorizontal: 14,
        paddingTop: 10,
    },
    carDetails: {
        marginTop: 4,
        paddingHorizontal: 14,
    },
    priceTag: {
        marginTop: 16,
        paddingHorizontal: 14,
    },
    price: {
        color: '#000',
        fontSize: 26,
        fontWeight: '900',
        lineHeight: 28,
        paddingHorizontal: 14,
    },
    descriptionConatiner: {
        marginTop: 26,
        backgroundColor: '#d5d5d5',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    descriptionTag: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    description: {
        marginTop: 10,
        fontSize: 16,
    },
    informationsTag: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        paddingHorizontal: 14,
        marginTop: 20,
    },
    informationsConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 20,
    },
    information: {textAlign: 'right'},
    userTag: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        paddingHorizontal: 14,
        marginTop: 20,
        paddingTop: 10,
        backgroundColor: '#d5d5d5',
    },
    userContainer: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d5d5d5',
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 18,
    },
    username: {fontSize: 24, color: '#000'},
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default DetailsScreen;
