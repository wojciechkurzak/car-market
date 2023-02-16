import React, {useState, useContext} from 'react';
import {CarFormType} from '../interfaces/AddCarInterface';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../config/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AddInputList from '../components/AddInputList';
import {Asset} from 'react-native-image-picker';
import AddCarImage from '../components/AddCarImage';
import Button from '../components/Button';
import storage from '@react-native-firebase/storage';

const AddCarScreen = () => {
    const [image, setImage] = useState<Asset | null>(null);
    const [form, setForm] = useState<CarFormType>({
        title: '',
        carBrand: '',
        price: '',
        description: '',
        productionDate: '',
        mileage: '',
        displacement: '',
        fuelType: '',
        country: '',
        town: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState<string>('');

    const user = useContext(AuthContext);

    const navigation = useNavigation();

    const addCar = async (): Promise<void> => {
        if (!user) return;
        if (!image || Object.values(form).some(value => value === '')) {
            setError('Inputs cannot be empty');
            return;
        }

        await firestore()
            .collection('CarOffers')
            .add({
                ...form,
                userId: user.uid,
                image: image.fileName,
            });

        await storage().ref(`carsImages/${image.fileName}`).putFile(image.uri!);

        navigation.goBack();
    };

    return (
        <AddInputList
            form={form}
            setForm={setForm}
            addImage={<AddCarImage image={image} setImage={setImage} />}
            addButton={<Button name="Create" onPress={addCar} />}
            error={error}
        />
    );
};

export default AddCarScreen;
