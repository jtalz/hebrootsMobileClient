import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken } from '../apiRequests';

const check_for_token = async () => {     
    try {
        let userToken = await AsyncStorage.getItem('user_token');
        return userToken !== null ? await validateToken(userToken) : undefined
    }catch (e) {
        console.log('checking for token failed')
        return undefined;
    }
};

export default check_for_token;