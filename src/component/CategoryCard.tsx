import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'

interface CardOptions {
    title : string;
    active? : Boolean;
    style? : StyleProp<ViewStyle>
}

export default function CategoryCard(props : CardOptions) {
    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            style={[{
                fontWeight:'bold',
                color : props?.active ? "#000" : "#999",
                backgroundColor : props?.active ? "#eee" : "#fff",
                paddingHorizontal : 15,
                paddingVertical : 5,
                borderRadius:15
            }, props?.style]}
        >
            <Text>{props?.title}</Text>
        </TouchableOpacity>
    )
}