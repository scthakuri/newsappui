import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { images } from '../../assets';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function Header() {

    const theme = useTheme();

    return (
        <View style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:"#fff",
            zIndex : 999999
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image
                    source={images?.[theme.dark ? "dark" : "light"]?.logo}
                    style={{
                        width: 35,
                        height: 35
                    }}
                />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: theme.dark ? "#fff" : "#000"
                }}>CHPNEWS</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        marginRight:10
                    }}
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
                        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                        <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})