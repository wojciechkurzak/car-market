import React, {useState, useContext} from 'react';
import {CarFormType} from '../interfaces/AddCarInterface';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../config/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AddInputList from '../components/AddInputList';
import {Asset} from 'react-native-image-picker';
import AddCarImage from '../components/AddCarImage';
import AuthButton from '../components/AuthButton';
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

    const user = useContext(AuthContext);

    const navigation = useNavigation();

    const addCar = (): void => {
        if (user && image && !Object.values(form).some(value => value === '')) {
            firestore()
                .collection('CarOffers')
                .add({
                    ...form,
                    userId: user.uid,
                    image: image.fileName,
                })
                .then(() => {
                    storage()
                        .ref(`carsImages/${image.fileName}`)
                        .putFile(image.uri!)
                        .then(() => navigation.goBack());
                })
                .catch(error => {
                    throw error;
                });
        }
    };

    return (
        <AddInputList
            form={form}
            setForm={setForm}
            addImage={<AddCarImage image={image} setImage={setImage} />}
            addButton={<AuthButton name="Add" access={addCar} />}
        />
    );
};

export default AddCarScreen;
