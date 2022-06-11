import React, { RefObject } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import { useValue, withTimingTransition } from "react-native-redash/src/v1";

import TabHeader from './Tab/TabHeader'


import { useNavigation, useTheme } from "@react-navigation/native";
import { TabModel } from "./Content";

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { images } from "./../assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_IMAGE_HEIGHT } from "../constants";

const ICON_SIZE = 35;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 50;
const { interpolateNode, Extrapolate, useCode, greaterThan, set, block } = Animated;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    header: {
        flexDirection: "row",
        height: MIN_HEADER_HEIGHT,
        alignItems: "center",
        paddingHorizontal: PADDING,
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 18,
        marginLeft: PADDING,
        flex: 1,
    },
    menuOptions : {
        padding : 10,
        borderColor:"#eee",
        borderBottomWidth:1
    }
});

interface HeaderProps {
    y: Animated.Value<number>;
    tabs: TabModel[];
    scrollView: RefObject<Animated.ScrollView>;
}

export default function Header({ y, tabs, scrollView }: HeaderProps) {

    const theme = useTheme();
    const navigation = useNavigation();
    const toggle = useValue<0 | 1>(0);
    const insets = useSafeAreaInsets();

    const transition = withTimingTransition(toggle, { duration: 100 });
    const { top: paddingTop } = insets;
    const translateX = interpolateNode(y, {
        inputRange: [0, HEADER_IMAGE_HEIGHT],
        outputRange: [-ICON_SIZE - PADDING, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const translateY = interpolateNode(y, {
        inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
        outputRange: [
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
            0,
        ],
        extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = transition;
    useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
        toggle,
        y,
    ]);
    return (
        <Animated.View style={[styles.container, { paddingTop }]}>
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    backgroundColor: "white",
                }}
            />
            <View style={styles.header}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image
                        source={images?.[theme.dark ? "dark" : "light"]?.logo}
                        style={{
                            width: ICON_SIZE,
                            height: ICON_SIZE
                        }}
                    />
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: theme.dark ? "#fff" : "#000",
                        marginLeft: 5
                    }}>CHPNEWS</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            marginRight: 10
                        }}
                        onPress={() => navigation.navigate("Language")}
                    >
                        <Image
                            source={images?.[theme.dark ? "dark" : "light"]?.lang}
                            style={{
                                width: 22,
                                height: 22
                            }}
                        />
                    </TouchableOpacity>

                    <Menu>
                        <MenuTrigger style={{

                        }}>
                            <Image
                                source={images?.[theme.dark ? "dark" : "light"]?.menu}
                                style={{
                                    width: 22,
                                    height: 22
                                }}
                            />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption style={styles.menuOptions} onSelect={() => alert(`Settings`)} text='Settings' />
                            <MenuOption style={styles.menuOptions} onSelect={() => alert(`Notices`)} >
                                <Text style={{ color: 'red' }}>Notices</Text>
                            </MenuOption>
                            <MenuOption style={styles.menuOptions} onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                        </MenuOptions>
                    </Menu>
                </View>

            </View>
            <TabHeader {...{ y, transition, tabs, scrollView }} />
        </Animated.View>
    );
};