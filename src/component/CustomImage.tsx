import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

interface ImageProps {
    url : string;
    style? : StyleProp<ViewStyle>
}

export default function CustomImage(props : ImageProps) {
    return (
        <FastImage
            source={{
                uri : props.url,
                priority: FastImage.priority.normal
            }}
            style={[{}, props.style]}
            resizeMode={FastImage.resizeMode.contain}
        />
    )
}