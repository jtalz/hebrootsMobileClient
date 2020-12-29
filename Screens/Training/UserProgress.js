import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bird from '../../Components/Characters/Bird'

const UserProgress = ({ route, navigation }) => {
    const [prefill, setPrefill] = useState(0)
    const [fill, setFill] = useState(50)

//loop through 
    return (
        <View style = {styles.container}>
            <View style={styles.intro}>
                <Bird
                    size = 'Large'
                    birdType = 'Old'
                    style={{left: -20}}
                />
                <Text style={{width: '70%', fontSize: 20, textAlign: 'center', fontFamily: 'Bodoni 72',}}>
                    This feature will be available in upcoming versions. Thank you for your support.
                </Text>
            </View>
        </View>
    )
}
//<Header><SearchBar onEnter={() => onSearch} /></Header>
const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    intro: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10
    },
    listItem: {
        alignItems: 'center',
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 8,
    }
  });

export default UserProgress;