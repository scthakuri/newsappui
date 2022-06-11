import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";

import Content, { defaultTabs } from "../component/Content";
import Header from "../component/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function Dashboard(){
    const scrollView = useRef<Animated.ScrollView>(null);
    const [tabs, setTabs] = useState(defaultTabs);
    const y = useValue(0);
    const onScroll = onScrollEvent({ y });
    return (
        <View style={styles.container}>
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
            <Header {...{ y, tabs, scrollView }} />
        </View>
    );
};