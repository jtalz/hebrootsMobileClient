import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import getHebrewConsonantCodes from '../Actions/GetMethods/GetHebrewConsonantCodes';
import { normalize } from '../Actions/Normalize';
import _3DButton from '../Components/Buttons/_3DButton';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler'
import SentenceWithVerb from '../Components/SentenceWithVerb';
import { SCREEN_HEIGHT } from '../Actions/ScreenDimensions';
/* import Animated from 'react-native-reanimated' */

const MultipleChoices = ({ 
    choices, setSelected, selected, style, 

    possession,
  tense,
  verb,
  answered,
  morphology,
  tense_en,
  pattern,
  noun_phrase,
  gameStyle,
/*   handleTextInput,
  inputValue,
  inputEnabled, */
  pronoun_en,
  enabled

}) => {

    const onPanGestureEvent = (_translate) => {
        return Animated.event(
            [
              { 
                nativeEvent: {
                  translationX: _translate.x,
                  translationY: _translate.y,
                },
              },
            ],
            { useNativeDriver: true }
          );
    }
    const [spaceLayout, setSpaceLayout] = useState({x: 0, y: 0})

    const [spaceFull, setSpaceFull] = useState({occupier: null, isFull: false})

    /* useEffect(()=>{
        
    }, [choices]) */

    const onHandlerStateChange = (_layout, _translate, index) => (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            _translate.flattenOffset()
                spaceFull.isFull ? 
                Animated.timing(_translate, { 
                    toValue: {x: 0, y:0},
                    duration: 200,
                    useNativeDriver: true
                }).start(()=>{
                    _translate.setOffset({x: 0, y: 0});
                    _translate.setValue({x: 0, y: 0});
                    if(spaceFull.occupier == index){
                        setSpaceFull({occupier: null, isFull: false})
                        setSelected(null)
                    }
                })
                :
                Animated.timing(_translate, { 
                    toValue: {x: spaceLayout.x-_layout.x+ normalize(getHebrewConsonantCodes(verb).length), y:spaceLayout.y- _layout.y+ normalize(10)},
                    duration: 200,
                    useNativeDriver: true
                })
                .start(()=>{
                    _translate.setOffset({x: spaceLayout.x-_layout.x+ normalize(getHebrewConsonantCodes(verb).length), y: spaceLayout.y- _layout.y+normalize(10)});
                    _translate.setValue({x: 0, y: 0});
                    setSpaceFull({occupier: index, isFull: true})
                    setSelected(index)
                })
        }
    };

    return ( 
        <View style={{...style}}>
            
            <SentenceWithVerb
            gameStyle={gameStyle}
            possession={
              possession
            }
            tense={tense}
            verb={verb}
            answered={answered}
            morphology={
              morphology
            }
            tense_en={tense_en}
            pattern={pattern}
            noun_phrase={noun_phrase}
            pronoun_en={pronoun_en}
            setSpaceLayout = {setSpaceLayout}
            spaceLayout = {spaceLayout}
            style={{marginBottom: SCREEN_HEIGHT/5}}
            />
            

            {
                choices.map((choice, index) => {

                    const _translate = useState(new Animated.ValueXY({
                        x: 0, 
                        y: 0
                    }))[0]
                    //console.log(_translate.getLayout())
                    let _lastOffset = { 
                        x: 0, 
                        y: 0 
                    };

                    //_translate.addListener(val=>_lastOffset=val)

                    const [layout, setLayout] = useState({x: '', y: ''})

                    const _onPanGestureEvent = onPanGestureEvent(_translate)
                    
                    const _onHandlerStateChange = onHandlerStateChange(layout, _translate, index)

                    useEffect(()=>{

                        if (spaceFull.occupier == index){
                            Animated.timing(_translate, {
                                toValue: {x: 0, y: 0},
                                duration: 0,
                                useNativeDriver: true
                            }).start(()=>{
                                _translate.setOffset({x: 0, y: 0});
                                _translate.setValue({x: 0, y: 0});
                                setSpaceFull({occupier: null, isFull: false})
                                setSelected(null)
                            })
                        }

                    }, [choices])


                    var _selected = index == selected;
                 return (
                    <View key={index}
                        style={{alignSelf: 'center', backgroundColor: '#e8e8e8', borderRadius: 10, marginVertical: 10}}
                    /*  onLayout={(event)=>{console.log(event.nativeEvent)}} */
                    onLayout={event => {
                        setLayout({
                            x: event.nativeEvent.layout.x, 
                            y: event.nativeEvent.layout.y, 
                        })
                      }}>
                    <PanGestureHandler
                        onGestureEvent={_onPanGestureEvent}
                        onHandlerStateChange={_onHandlerStateChange}
                        hitSlop={{horizontal: 10, vertical: 10}}
                        enabled={enabled}
                    >
                        <Animated.View>
                        <TapGestureHandler
                            //onGestureEvent={_onPanGestureEvent}
                            onHandlerStateChange={_onHandlerStateChange}
                            enabled={enabled}
                        >
                        <Animated.View
                            style={[
                                {
                                    transform: [
                                        {
                                          translateX: _translate.x,
                                        },
                                        { 
                                          translateY: _translate.y 
                                        },
                                      ],
                                }
                              ]}                     
                        >
                            <_3DButton 
                                width={normalize(getHebrewConsonantCodes(choice).length*15)}
                                height={46}
                                backgroundColor={'white'}
                                borderWidth={1}
                                borderRadius= {10}
                                borderColor={'#C0C0C0'}
                                //backgroundShadow={_selected ? 'rgba(44, 128, 255, 0.72)' : '#C0C0C0'}
                                //backgroundDarker={_selected ? 'rgba(44, 128, 255, 0.72)' : '#C0C0C0'}
                                name = {choice} 
                                //name = {`(${layout.x}, ${layout.y})`}
                                key={index} 
                                //onPress={() => setSelected(index)} 
                                enabled={false} 
                                
                                fontSize={normalize(15)}
                                
                            />
                        </Animated.View>
                        </TapGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                    </View>
                 )
                })
            }
        </View>
     );
}
 
export default MultipleChoices;