import React, {useRef, useState} from 'react';
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
import {carAddInputs, CarInputType} from '../data/carAddInputs';
import Icon from 'react-native-vector-icons/Feather';
import {
    darkGray,
    errorColor,
    iconColor,
    lightGray,
    placeholderColor,
    textColor,
} from '../config/theme/theme';

type AddInputListProps = {
    form: CarFormType;
    setForm: (value: CarFormType) => void;
    addImage: JSX.Element;
    addButton: JSX.Element;
    error: string;
};

const AddInputList = ({
    form,
    setForm,
    addImage,
    addButton,
    error,
}: AddInputListProps) => {
    const [brandModal, setBrandModal] = useState<boolean>(false);

    let listRef: any = useRef();

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
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>{item.placeholder}</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Type here..."
                        placeholderTextColor={placeholderColor}
                        maxLength={item.length}
                        keyboardType={item.keyboardType}
                        multiline={item.multiline}
                        numberOfLines={item.numberOfLines}
                        value={form[item.type as keyof CarFormType]}
                        onChangeText={text => {
                            setForm({...form, [item.type]: text});
                        }}
                    />
                </View>
            );
        else
            return (
                <TouchableWithoutFeedback onPress={() => setBrandModal(true)}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>{item.placeholder}</Text>
                        <View style={styles.formInput}>
                            <Text
                                style={{
                                    marginLeft: 4,
                                    color: form.carBrand
                                        ? textColor
                                        : placeholderColor,
                                }}>
                                {form.carBrand ? form.carBrand : 'Select brand'}
                            </Text>
                            {!form.carBrand ? (
                                <Icon name="plus" size={26} color={iconColor} />
                            ) : (
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        setForm({...form, carBrand: ''})
                                    }>
                                    <Icon
                                        name="x"
                                        size={26}
                                        color={iconColor}
                                    />
                                </TouchableWithoutFeedback>
                            )}
                        </View>
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
                ref={listRef}
                onContentSizeChange={() =>
                    error && listRef.current.scrollToEnd({animated: true})
                }
                ListHeaderComponent={addImage}
                ListFooterComponent={() => (
                    <View>
                        {error && (
                            <Text style={styles.errorMessage}>{error}</Text>
                        )}
                        {addButton}
                    </View>
                )}
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
        paddingVertical: 20,
        backgroundColor: darkGray,
    },
    formContainer: {
        marginTop: 14,
        paddingHorizontal: 28,
    },
    formTitle: {
        color: '#fff',
        fontSize: 18,
    },
    formInput: {
        borderBottomWidth: 2,
        borderColor: lightGray,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 86,
        color: textColor,
    },
    showResultContainer: {
        width: 300,
        marginVertical: 20,
        alignSelf: 'center',
    },
    showResult: {
        width: '100%',
        backgroundColor: '#55f',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        borderRadius: 6,
        lineHeight: 28,
        color: textColor,
    },
    modalOption: {
        fontSize: 18,
        lineHeight: 28,
        borderRadius: 8,
        marginVertical: 4,
        marginLeft: 14,
        color: textColor,
    },
    errorMessage: {
        marginTop: 4,
        fontSize: 16,
        alignSelf: 'center',
        color: errorColor,
    },
});

export default AddInputList;
