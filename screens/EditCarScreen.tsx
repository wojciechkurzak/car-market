import React, {useState, useContext} from 'react';
import {CarFormType} from '../interfaces/AddCarInterface';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../config/context/AuthContext';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import AddInputList from '../components/AddInputList';
import {Asset} from 'react-native-image-picker';
import AddCarImage from '../components/AddCarImage';
import Button from '../components/Button';
import storage from '@react-native-firebase/storage';
import {StackParamList} from '../App';

type EditRouteProp = RouteProp<StackParamList, 'Edit'>;

const EditCarScreen = () => {
    const route = useRoute<EditRouteProp>();
    const {car} = route.params;

    const [image, setImage] = useState<Asset | null>(null);
    const [form, setForm] = useState<CarFormType>({
        title: car.title,
        carBrand: car.carBrand,
        price: car.price,
        description: car.description,
        productionDate: car.productionDate,
        mileage: car.mileage,
        displacement: car.displacement,
        fuelType: car.fuelType,
        country: car.country,
        town: car.town,
        email: car.email,
        phone: car.phone,
    });
    const [error, setError] = useState<string>('');

    const user = useContext(AuthContext);

    const navigation = useNavigation();

    const editCar = (): void => {
        if (!user) return;
        if (Object.values(form).some(value => value === '')) {
            setError('Inputs cannot be empty');
            return;
        }
        firestore()
            .collection('CarOffers')
            .doc(car.id)
            .update(
                image
                    ? {
                          ...form,
                          image: image.fileName,
                      }
                    : {
                          ...form,
                      },
            )
            .then(() => {
                if (image !== null) {
                    storage()
                        .ref(`carsImages/${image.fileName}`)
                        .putFile(image.uri!)
                        .catch(error => {
                            throw error;
                        });
                }
            })
            .then(() => {
                navigation.goBack();
            })
            .catch(error => {
                throw error;
            });
    };

    return (
        <AddInputList
            form={form}
            setForm={setForm}
            addImage={
                <AddCarImage
                    image={image}
                    setImage={setImage}
                    defaultImage={car.image}
                />
            }
            addButton={<Button name="Edit" onPress={editCar} />}
            error={error}
        />
    );
};

export default EditCarScreen;
