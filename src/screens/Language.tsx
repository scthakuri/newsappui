import { StyleSheet, Text, View, Platform, Image, Dimensions, StatusBar, FlatList } from 'react-native'
import React,{useState} from 'react'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import Animated from 'react-native-reanimated';
import { LanguageList } from '../constants/LangData';
import RadioButton, { RadioGroup } from 'rn-radio-button-group';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default function Language() {

    let navTitleView = React.useRef();
    const [langValue, setLangValue] = useState("en");

    return (
        <>
            <StatusBar
                backgroundColor={"#F5F5F5"}
            />
            <ImageHeaderScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0}
                minOverlayOpacity={0}
                fadeOutForeground
                renderHeader={() => (
                    <Image source={require("../assets/back.png")} style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>Language</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animated.View
                        style={styles.navTitleView}
                        ref={navTitleView}
                    >
                        <Text style={styles.navTitle}>Language</Text>
                    </Animated.View>
                )}
            >
                <View style={styles.section}>
                    <TriggeringView
                        onHide={() => navTitleView?.current?.fadeInUp(200)}
                        onDisplay={() => navTitleView?.current?.fadeOut(100)}
                    >
                        <RadioGroup
                            onValueChange={(value) => setLangValue(value)}
                            selectedValue={langValue}
                        >
                            {
                                LanguageList.map((lang, index) => (
                                    <RadioButton
                                        value={lang?.value}
                                        key={index}
                                        style={{
                                            marginBottom:10
                                        }}
                                        size={27}
                                        color="#009688"
                                    >
                                        <Text style={{
                                            marginLeft:10,
                                            fontSize:18
                                        }}>{lang?.label}</Text>
                                    </RadioButton>
                                ))
                            }
                        </RadioGroup>

                    </TriggeringView>
                </View>
            </ImageHeaderScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: '#000',
        backgroundColor: 'transparent',
        fontSize: 35,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
        backgroundColor: "#fff"
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
})