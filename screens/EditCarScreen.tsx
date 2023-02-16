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
import {StackNavigationProp} from '@react-navigation/stack';

type EditRouteProp = RouteProp<StackParamList, 'Edit'>;
type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

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

    const navigation = useNavigation<HomeNavigationProp>();

    const editCar = async (): Promise<void> => {
        if (!user) return;
        if (Object.values(form).some(value => value === '')) {
            setError('Inputs cannot be empty');
            return;
        }
        await firestore()
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
            );

        if (image !== null) {
            await storage()
                .ref(`carsImages/${image.fileName}`)
                .putFile(image.uri!)
                .catch(error => {
                    throw error;
                });
        }

        navigation.replace('Home', {screen: 'MyCars'});
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
