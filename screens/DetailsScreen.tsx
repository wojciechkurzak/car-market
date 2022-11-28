import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackParamList} from '../App';
import {darkGray, lightGray} from '../config/theme/theme';
import Title from '../components/car_info/Title';
import Details from '../components/car_info/Details';
import Price from '../components/car_info/Price';
import Description from '../components/car_info/Description';
import Informations from '../components/car_info/Informations';
import About from '../components/car_info/About';
import Contact from '../components/car_info/Contact';
import CarImage from '../components/car_info/CarImage';
import Animated, {
    interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import DetailsHeader from '../components/DetailsHeader';

type DetailsRouteProp = RouteProp<StackParamList, 'Details'>;

const DetailsScreen = () => {
    const route = useRoute<DetailsRouteProp>();

    const {
        id,
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

    const {edit} = route.params;

    const scrollY = useSharedValue(0);

    const animation = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            scrollY.value,
            [170, 200],
            ['rgba(17, 17, 17, 0)', 'rgba(17, 17, 17, 1)'],
        );

        return {backgroundColor};
    });

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    return (
        <View style={{position: 'relative'}}>
            <DetailsHeader itemId={id} edit={edit} animation={animation} />
            <Animated.ScrollView
                overScrollMode="never"
                scrollEventThrottle={16}
                onScroll={scrollHandler}>
                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <CarImage image={image} />
                    </View>
                    <View style={styles.darkBox}>
                        <Title title={title} />
                        <Details
                            productionDate={productionDate}
                            mileage={mileage}
                            fuelType={fuelType}
                            displacement={displacement}
                        />
                        <Price price={price} />
                    </View>
                    <View style={styles.lightBox}>
                        <Description description={description} />
                    </View>
                    <View style={styles.darkBox}>
                        <Informations
                            productionDate={productionDate}
                            mileage={mileage}
                            fuelType={fuelType}
                            displacement={displacement}
                        />
                    </View>
                    <View style={styles.lightBox}>
                        <About userId={userId} />
                    </View>
                    <View style={styles.darkBox}>
                        <Contact email={email} phone={phone} />
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkGray,
    },
    darkBox: {
        padding: 14,
    },
    lightBox: {
        padding: 14,
        backgroundColor: lightGray,
    },
    imageBox: {
        width: '100%',
        height: 220,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default DetailsScreen;
