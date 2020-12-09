import { StyleSheet } from 'react-native';

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
        fontSize: 22
    }
  });

  export default styleHeaderFor;