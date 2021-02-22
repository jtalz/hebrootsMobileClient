import { StyleSheet } from 'react-native';
import fonts from '../styles/fontStyle';
import { normalize } from './Normalize';

const styleHeaderFor = (name) => {
    return {
                title: name, 
                headerStyle: styles.headerBgColor, 
                headerTintColor: '#fff', 
                headerTitleStyle: styles.headerTitle
            }
}

const styles = StyleSheet.create({
    headerBgColor: {
        backgroundColor: '#4294DB',
    },
    headerTitle: {
        fontWeight: 'normal',
        fontFamily: 'Poppins_300Light',
        fontSize: normalize(12)
    }
  });

  export default styleHeaderFor;