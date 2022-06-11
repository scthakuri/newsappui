import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { newsData } from '../Content'
import FullCard from '../News/FullCard'
import ListCard from '../News/ListCard'

export default function LatestNews() {

    const RenderNews = ({ item, index }) => {

        if (index == 0) {
            return (
                <FullCard {...item} />
            )
        }

        return (
            <ListCard
                {...item}
                style={{
                    marginTop: 0
                }}
            />
        )
    }

    return(
        <View style={{
            paddingHorizontal:15
        }} onLayout={(event) => {
            const {x, y, width, height} = event.nativeEvent.layout;
            console.log(width, height);
        }}>
            {
                newsData.map((item, index) => <RenderNews item={item} index={index} key={index} />)
            }
        </View>
    )
}