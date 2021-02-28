import { StyleSheet } from 'react-native';
import { Colors } from '../styles/index';
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
        ...Colors.bgHebroots,
    },
    headerTitle: {
        fontWeight: 'normal',
        fontFamily: 'Poppins_300Light',
        fontSize: normalize(12)
    }
  });

  export default styleHeaderFor;