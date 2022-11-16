import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import {CarFormType} from '../interfaces/AddCarInterface';
import BrandModal from '../components/BrandModal';
import {carAddInputs} from '../data/carAddInputs';
import Icon from 'react-native-vector-icons/Feather';

type CarInputType = {
    type: string;
    placeholder: string;
    length: number;
    multiline?: boolean;
    numberOfLines?: number;
};

type AddInputListProps = {
    form: CarFormType;
    setForm: (value: CarFormType) => void;
    addImage: JSX.Element;
    addButton: JSX.Element;
};

const AddInputList = ({
    form,
    setForm,
    addImage,
    addButton,
}: AddInputListProps) => {
    const [brandModal, setBrandModal] = useState<boolean>(false);

    const modalItem = (title: string): JSX.Element => (
        <TouchableWithoutFeedback
            onPress={() => {
                setForm({...form, carBrand: title});
                setBrandModal(false);
            }}>
            <Text style={styles.modalOption}>{title}</Text>
        </TouchableWithoutFeedback>
    );

    const renderItem = ({item}: {item: CarInputType}): JSX.Element => {
        if (item.type !== 'brand')
            return (
                <TextInput
                    style={styles.formInput}
                    placeholder={item.placeholder}
                    maxLength={item.length}
                    multiline={item.multiline}
                    numberOfLines={item.numberOfLines}
                    value={form[item.type as keyof CarFormType]}
                    onChangeText={text => {
                        setForm({...form, [item.type]: text});
                    }}
                />
            );
        else
            return (
                <TouchableWithoutFeedback onPress={() => setBrandModal(true)}>
                    <View style={styles.formInput}>
                        <Text>
                            {form.carBrand ? form.carBrand : 'Select brands'}
                        </Text>
                        {!form.carBrand ? (
                            <Icon name="plus" size={26} color="#000" />
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    setForm({...form, carBrand: ''})
                                }>
                                <Icon name="x" size={26} color="#000" />
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={carAddInputs}
                renderItem={renderItem}
                overScrollMode="never"
                ListHeaderComponent={addImage}
                ListFooterComponent={addButton}
            />
            <BrandModal
                visible={brandModal}
                setVisible={setBrandModal}
                modalItem={modalItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 86,
        marginHorizontal: 20,
    },
    showResultContainer: {
        width: 300,
        marginVertical: 20,
        alignSelf: 'center',
    },
    showResult: {
        width: '100%',
        backgroundColor: '#55f',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        borderRadius: 6,
        lineHeight: 28,
    },
    modalOption: {
        fontSize: 18,
        backgroundColor: '#eee',
        lineHeight: 28,
        borderRadius: 8,
        marginVertical: 4,
        textAlign: 'center',
    },
});

export default AddInputList;
