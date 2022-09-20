import React from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
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
    const renderItem = ({item}: {item: string}) => (
        <FiltersCheckbox
            title={item}
            filters={filters}
            setFilters={setFilters}
        />
    );

    return (
        <View>
            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(!visible)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.closeContainer}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.modal}>
                        <FlatList
                            data={CarBrands}
                            renderItem={renderItem}
                            overScrollMode={'never'}
                            initialNumToRender={CarBrands.length}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
    },
    modal: {
        width: 300,
        height: 520,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
    },
});

export default FiltersModal;
