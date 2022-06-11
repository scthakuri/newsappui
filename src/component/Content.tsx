import React from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import ListCard from './News/ListCard'
import LatestNews from './Dashboard/LatestNews'
import { MIN_HEADER_HEIGHT } from "./Header";


const news = [{
    "author": "Dan Peck",
    "title": "Hurricane Hanna makes landfall around 5 p.m. on Saturday.",
    "description": "Hurricane Hanna battered southern Texas with sustained winds of 75 mph and continued to deliver heavy rain and flash flooding as it moved inland late Saturday.",
    "image": "https://s.abcnews.com/images/US/hanna-swimmer-mo_hpMain_20200725-163152_2_4x3t_384.jpg",
    "category": "general",
    "published_at": "2020-07-26T01:04:23+00:00"
},
{
    "author": "TMZ Staff",
    "title": "Nicki Minaj's Husband Gets Permission To Be There For Baby's Birth",
    "description": "Kenneth can be in the room when Nicki gives birth ... a judge just granted his request to tweak his pre-trial release conditions so he can travel with Nicki. With the court's order in place, KP can travel with Nicki periodically on biz…",
    "image": "https://imagez.tmz.com/image/c1/4by3/2020/07/30/c115ad2dc849438a97a0ad3097b416df_md.jpg",
    "category": "general",
    "published_at": "2020-08-01T05:34:47+00:00"
},
{
    "author": "Michael Rothstein",
    "title": "New Lions safety Jayron Kearse suspended three games",
    "description": "Kearse, 26, signed with the Lions in March after four seasons in Minnesota, where he played in 62 games with five starts, making 79 tackles and defending eight passes.",
    "url": "https://www.espn.com/nfl/story/_/id/29572640/new-lions-safety-jayron-kearse-suspended-three-games",
    "image": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0111%2Fr651071_1296x729_16%2D9.jpg",
    "category": "sports",
    "published_at": "2020-07-31T23:23:14+00:00"
},
{
    "author": "Dan Peck",
    "title": "Hurricane Hanna makes landfall around 5 p.m. on Saturday.",
    "description": "Hurricane Hanna battered southern Texas with sustained winds of 75 mph and continued to deliver heavy rain and flash flooding as it moved inland late Saturday.",
    "url": "https://abcnews.go.com/US/hurricane-hanna-makes-landfall-texas/story?id=71985566",
    "image": "https://s.abcnews.com/images/US/hanna-swimmer-mo_hpMain_20200725-163152_2_4x3t_384.jpg",
    "category": "general",
    "published_at": "2020-07-26T01:04:23+00:00"
},
{
    "author": "TMZ Staff",
    "title": "Nicki Minaj's Husband Gets Permission To Be There For Baby's Birth",
    "description": "Kenneth can be in the room when Nicki gives birth ... a judge just granted his request to tweak his pre-trial release conditions so he can travel with Nicki. With the court's order in place, KP can travel with Nicki periodically on biz…",
    "url": "https://www.tmz.com/2020/07/30/nicki-minaj-husband-asks-judge-be-there-child-birth/",
    "source": "TMZ.com",
    "image": "https://imagez.tmz.com/image/c1/4by3/2020/07/30/c115ad2dc849438a97a0ad3097b416df_md.jpg",
    "category": "general",
    "published_at": "2020-08-01T05:34:47+00:00"
},
{
    "author": "Michael Rothstein",
    "title": "New Lions safety Jayron Kearse suspended three games",
    "description": "Kearse, 26, signed with the Lions in March after four seasons in Minnesota, where he played in 62 games with five starts, making 79 tackles and defending eight passes.",
    "url": "https://www.espn.com/nfl/story/_/id/29572640/new-lions-safety-jayron-kearse-suspended-three-games",
    "image": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0111%2Fr651071_1296x729_16%2D9.jpg",
    "category": "sports",
    "published_at": "2020-07-31T23:23:14+00:00"
}];

export const newsData = news;

const menu = [
    { name: "Politics", news },
    { name: "Sports", news },
    { name: "Entertainment", news },
    { name: "Health", news },
    { name: "Worklife", news },
    { name: "Future", news },
    { name: "Culture", news }
];

export const defaultTabs = menu.map(({ name }) => ({ name, anchor: 0 }));

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 15,
        paddingTop:10
    },
    title1: {
        fontSize: 15,
        color:"#999",
        fontWeight:'bold',
        textTransform:"uppercase",
        paddingBottom:10
    },
    bottomBtn : {
        borderColor:"#999",
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'center',
        margin:20
    }
});

export interface TabModel {
    name: string;
    anchor: number;
}

interface ContentProps {
    y: Animated.Node<number>;
    onMeasurement: (index: number, tab: TabModel) => void;
}

export default ({ y, onMeasurement }: ContentProps) => {    
    return (
        <View style={{
            paddingTop: MIN_HEADER_HEIGHT + 20
        }}>
            <LatestNews 

            />
            {menu.map(({ name, news: catNews }, index) => (
                <View
                    style={styles.section}
                    key={index}
                    onLayout={({
                        nativeEvent: {
                            layout: { y: anchor },
                        },
                    }) => onMeasurement(index, { name, anchor: anchor - 142 })}
                >
                    <Text style={styles.title1}>{name}</Text>
                    {catNews.map((singleNews, j) => (
                        <View key={j}>
                            <ListCard
                                {...singleNews}
                            />
                        </View>
                    ))}
                </View>
            ))}

            <TouchableOpacity style={styles.bottomBtn}>
                <Text style={{
                    textAlign:'center',
                    color : "#999"
                }}>Explore Latest News</Text>
            </TouchableOpacity>
        </View>
    );
};