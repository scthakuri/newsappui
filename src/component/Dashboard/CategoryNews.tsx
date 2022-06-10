import { StyleSheet, FlatList, Text } from 'react-native'
import React from 'react'
import ListCard from '../News/ListCard'

interface Props {
    title : string;
}

export default function CategoryNews(props : Props) {

    const arrayData = Array(5).fill(0)

    const data = {
        title: "राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन",
        image: "https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"
    };
    

    const renderNews = ({ item, index }) => {
        return (
            <ListCard
                {...data}
                style={{
                    marginTop: 20
                }}
            />
        )
    }

    const headerComponent = () => {
        return (
            <Text style={{
                marginVertical : 15,
                color : "#999"
            }}>{props.title}</Text>
        )
    }

    return (
        <FlatList
            data={arrayData}
            keyExtractor={(item, index) => index}
            renderItem={renderNews}
            listHeaderComponent={headerComponent}
        />
    )
}

const styles = StyleSheet.create({})