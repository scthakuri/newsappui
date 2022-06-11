import { View, Text } from 'react-native'
import React from 'react'
import CustomImage from '../CustomImage';
import { NewsProps } from '../../constants';
import { TimeAgo } from '../../constants/Functions';

export default function ListCard(props: NewsProps) {
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
                    marginVertical: 1,
                    textTransform:'capitalize'
                }}>{props?.category}</Text>

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
                }}>{TimeAgo(props?.published_at)}</Text>
            </View>
        </View>
    )
}