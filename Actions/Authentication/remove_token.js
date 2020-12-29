import AsyncStorage from '@react-native-async-storage/async-storage';

const remove_token = async (token) => {
    try{
        await AsyncStorage.removeItem('user_token')
        return true;
    }catch(err){
        return false;
    }
}

export default remove_token;