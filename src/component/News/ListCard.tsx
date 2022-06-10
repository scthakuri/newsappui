import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import CustomImage from '../CustomImage';

interface CardProps {
    id?: number;
    title: string;
    description?: string;
    image: string;
    style? : StyleProp<ViewStyle>
}

export default function ListCard(props: CardProps) {
    return (
        <View style={[{
            flexDirection: 'row',
            alignItems: 'center',
            width : "100%",
            overflow:'hidden'
        }, props?.style]}>
            <CustomImage
                url={props?.image}
                style={{
                    height: 90,
                    width: 100,
                    borderRadius: 15
                }}
            />

            <View style={{
                marginLeft: 10
            }}>
                <Text style={{
                    fontSize: 12,
                    color: "#999",
                    marginVertical: 1
                }}>Top News</Text>

                <Text
                    style={{
                        color: "#000",
                        fontSize: 15,
                        fontWeight: 'bold',
                        flexWrap : 'wrap',
                        width : "60%"
                    }}
                    numberOfLines={2}
                >{props?.title}</Text>

                <Text style={{
                    fontSize: 12,
                    color: "#999",
                    marginVertical: 1
                }}>1 Hour Ago</Text>
            </View>
        </View>
    )
}