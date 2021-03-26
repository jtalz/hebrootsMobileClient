import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

const styleHeaderFor = (name) => {
    return {
                title: name, 
                headerStyle: styles.headerBgColor, 
                headerTintColor: '#fff', 
                headerTitleStyle: styles.headerTitle,
                headerBackTitle: ' '
            }
}

const styles = StyleSheet.create({
    headerBgColor: {
        ...Colors.bgHebroots,
    },
    headerTitle: {
        fontWeight: 'normal',
        fontFamily: 'Poppins_300Light',
        ...Typography.size12
    }
  });

  export default styleHeaderFor;