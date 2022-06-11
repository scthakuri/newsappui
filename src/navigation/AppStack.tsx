import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Dashboard from '../screens/Dashboard';
import Language from '../screens/Language';
import Settings from '../screens/Settings';
import Single from '../screens/Single';

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown : false
            }}
        >
            <Stack.Group
                screenOptions={{ 
                    presentation: 'modal',
                }}
            >
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Single" component={Single} />
            </Stack.Group>
        </Stack.Navigator>
    )
}