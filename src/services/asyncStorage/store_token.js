import AsyncStorage from '@react-native-async-storage/async-storage';

const store_token = async (token) => {
    try{
        await AsyncStorage.setItem('user_token', token)
        return true;
    }catch(err){
        return false;
    }
}

export default store_token;