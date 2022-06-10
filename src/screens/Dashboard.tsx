import { View, SectionList, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import Header from '../component/Dashboard/Header'
import FullCard from '../component/News/FullCard'
import ListCard from '../component/News/ListCard'
import Categories from './../component/Dashboard/Categories';
import { newsData } from '../constants/newsData'
import { useTheme } from '@react-navigation/native';
import { images } from './../assets/index';

import Animated, { useValue } from "react-native-reanimated";
import Content, { defaultTabs } from '../component/Content'
import { onScrollEvent } from 'react-native-redash/lib/module/v1';

export default function Dashboard() {

    // const arrayData = Array(5).fill(0);
    const theme = useTheme();

    const scrollView = useRef<Animated.ScrollView>(null);
    const [tabs, setTabs] = useState(defaultTabs);
    const y = useValue(0);
    const onScroll = onScrollEvent({ y });

    const data = {
        title: "राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन",
        image: "https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"
    };

    const renderNews = ({ item, index }) => {

        if (index == 0) {
            return (
                <FullCard {...data} />
            )
        }

        return (
            <ListCard
                {...data}
                style={{
                    marginTop: 20
                }}
            />
        )
    }

    const footerArrow = () => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10
            }}>
                <Text style={{
                    color: theme.dark ? "#fff" : "#999"
                }}>More</Text>
                <Image
                    source={images?.[theme.dark ? "dark" : "light"]?.arrow}
                    style={{
                        width: 25,
                        height: 25
                    }}
                />
            </View>
        )
    }

    const footerComponent = () => {
        return (
            <>
                <Categories />

                <SectionList
                    sections={newsData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => <ListCard {...item} style={{
                        marginTop: index > 0 ? 10 : 5
                    }} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{
                            marginTop: 20,
                            marginBottom: 10,
                            color: "#999"
                        }}>{title}</Text>
                    )}
                    renderSectionFooter={footerArrow}
                />

                <TouchableOpacity activeOpacity={0.7} style={{
                    marginVertical: 40,
                    borderWidth: 1,
                    borderColor: "#999",
                    borderRadius: 10,
                    padding: 10
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: "#999",
                        textAlign: 'center'
                    }}>Explore Latest News</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
            position: 'relative'
        }}>
            <Header />

            <Animated.ScrollView
                ref={scrollView}
                style={StyleSheet.absoluteFill}
                scrollEventThrottle={1}
                {...{ onScroll }}
            >
                <Content
                    onMeasurement={(index, tab) => {
                        tabs[index] = tab;
                        setTabs([...tabs]);
                    }}
                    {...{ y }}
                />
            </Animated.ScrollView>

            {/* <FlatList
                data={arrayData}
                keyExtractor={(item, index) => index}
                renderItem={renderNews}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                ListFooterComponent={footerComponent}
                howsVerticalScrollIndicator={false}
            /> */}
        </View>
    )
}