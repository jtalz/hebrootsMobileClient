import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, Animated } from 'react-native'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Actions/ScreenDimensions'
import HebrootsLogo from '../../Components/HebrootsLogo'
import {normalize} from '../../Actions/Normalize'
import LoginRegister from '../../Containers/LoginRegister'
import check_for_token from '../../Actions/Authentication/check_for_token'


const backgroundGradient = { uri: 'https://user-images.githubusercontent.com/31594943/102720496-ad173500-42c2-11eb-85eb-0363288e546c.png'}

const SplashScreen = ({isSignedIn, noLogin, noUserFound, login }) => {
    useEffect(()=>{
        const attemptAutomaticSignIn = async () =>{
            const token = await check_for_token();
            setTimeout(()=>{
                if (token){
                    login(token)
                }else{
                    Animated.sequence([
                        logoSlideUp(),
                        loginFadeIn()
                    ]).start()
                }
            }, 2000)
        }
        attemptAutomaticSignIn();
    }, [])

    const logoY = useState(new Animated.Value(0))[0]

    const loginContainerOpacity = useState(new Animated.Value(0))[0]

    const sloganOpacity = useState(new Animated.Value(1))[0]

    const [logoSize, setLogoSize] = useState(50)

    const logoSlideUp = () => {
        setLogoSize(30)
        return Animated.timing(logoY, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          })
    }

    const loginFadeIn = () => {
        return Animated.parallel([
            Animated.timing(loginContainerOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(sloganOpacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start()
        ])
    }

    return (
        <View style={{...styles.container}}>
            <ImageBackground source={backgroundGradient} style={styles.image}>
                
                <Animated.View style = {[
                    {
                        transform: [
                            {
                              translateY: logoY.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [0, -SCREEN_HEIGHT/3, 0],
                              }),
                            },
                          ],
                          zIndex: 1
                    }
                ]}>
                    <HebrootsLogo logoSize = {logoSize} />
                </Animated.View>
                
                <Animated.View style={{position: 'absolute', opacity: loginContainerOpacity, alignSelf: 'center'}}>
                    <LoginRegister noLogin={noLogin} noUserFound={noUserFound} />
                </Animated.View>

                <Animated.Text style={{position: 'absolute', bottom: SCREEN_HEIGHT/10, fontFamily: 'Bodoni 72', fontSize: normalize(20), color: 'white', alignSelf: 'center', width: SCREEN_WIDTH/2, textAlign:'center',
                opacity: sloganOpacity
                }}>
                    Learning Hebrew the root way
                </Animated.Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      resizeMode: "cover",
      justifyContent: "center",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });

export default SplashScreen;