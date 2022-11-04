import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async (): Promise<String[]> => {
    const jsonValue = await AsyncStorage.getItem('@storage_Key').catch(
        error => {
            throw error;
        },
    );
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
};

export const setStorage = async (array: String[]): Promise<void> => {
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(array)).catch(
        error => {
            throw error;
        },
    );
};
