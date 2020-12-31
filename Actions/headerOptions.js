import { StyleSheet } from 'react-native';
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
        backgroundColor: '#2B78EC',
    },
    headerTitle: {
        fontWeight: 'normal',
        fontFamily: 'Nunito_300Light',
        fontSize: normalize(15)
    }
  });

  export default styleHeaderFor;