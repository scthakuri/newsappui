import { StyleSheet, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { NewsProps } from '../../constants'
import { TimeAgo } from '../../constants/Functions'


export default function FullCard(props: NewsProps) {
    return (
        <View style={{

        }}>
            <ImageBackground
                source={{
                    uri: props?.image
                }}
                style={{
                    height: 250,
                    position: 'relative'
                }}
                imageStyle={{
                    borderRadius: 6
                }}
                resizeMode="cover"
            >
                <Text style={{
                    backgroundColor: "#000",
                    borderRadius: 3,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    color: "#fff",
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    textTransform:"capitalize"
                }}>{props?.category}</Text>
            </ImageBackground>

            <Text style={{
                fontSize: 12,
                color: "#999",
                marginVertical: 7
            }}>Author: Suresh Chand</Text>

            <Text
                style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: 'bold'
                }}
                numberOfLines={2}
            >{props?.title}</Text>

            <Text style={{
                fontSize: 12,
                color: "#999",
                marginVertical: 7
            }}>{TimeAgo(props?.published_at)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})