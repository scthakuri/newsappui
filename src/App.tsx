import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppContext from './context/AppContext';
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = isDarkTheme ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={theme}>
            <StatusBar 
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.dark ? theme.colors.primary : "#fff"}
            />
            <AppContext.Provider value={{
                setIsDarkTheme: setIsDarkTheme
            }}>
                <MenuProvider>
                    <AppStack />
                </MenuProvider>
            </AppContext.Provider>
        </NavigationContainer>
    )
}