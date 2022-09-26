import React, {useState} from 'react';
import {
    Modal,
    TextInput,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    Text,
} from 'react-native';
import {FiltersType} from '../interfaces/FiltersInterface';
import {CarBrands} from '../utils/CarBrands';
import FiltersCheckbox from './FiltersCheckbox';

type FiltersModalType = {
    visible: boolean;
    setVisible: Function;
    filters: FiltersType;
    setFilters: Function;
};

const FiltersModal = ({
    visible,
    setVisible,
    filters,
    setFilters,
}: FiltersModalType) => {
    const [searchBrand, setSearchBrand] = useState<string>('');

    const renderItem = ({item}: {item: string}) => {
        if (!item.toLowerCase().includes(searchBrand.toLowerCase()))
            return null;
        else
            return (
                <FiltersCheckbox
                    title={item}
                    filters={filters}
                    setFilters={setFilters}
                />
            );
    };

    return (
        <View>
            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(!visible)}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.closeContainer}></View>
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modal}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={searchBrand}
                                onChangeText={value => setSearchBrand(value)}
                                placeholder="Type here"
                                style={styles.input}
                            />
                        </View>
                        <FlatList
                            data={CarBrands}
                            renderItem={renderItem}
                            extraData={searchBrand}
                            overScrollMode={'never'}
                            initialNumToRender={14}
                        />
                        <View style={styles.bottomTab}>
                            <TouchableWithoutFeedback
                                onPress={() => setVisible(false)}>
                                <Text style={styles.bottomText}>Close</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    closeContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
    },
    modal: {
        width: 300,
        height: 560,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    inputContainer: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#888',
    },
    input: {
        fontSize: 19,
        color: '#000',
    },
    bottomTab: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#888',
    },
    bottomText: {
        width: 70,
        fontSize: 18,
        backgroundColor: '#55f',
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: 6,
        lineHeight: 28,
    },
});

export default FiltersModal;