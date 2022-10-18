import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext} from 'react';

export const AuthContext = createContext<FirebaseAuthTypes.User | null>(null);
