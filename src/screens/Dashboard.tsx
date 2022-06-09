import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    Platform,
    TouchableOpacity,
    Alert,
    StatusBar,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Header from '../component/Dashboard/Header';
import LatestNews from '../component/Dashboard/LatestNews';
import ListCard from '../component/News/ListCard';
import { categoryNews } from '../constants/newsData'
import CategoryCard from '../component/CategoryCard'

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 800;
const SafeStatusBar = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight,
});
const tab1ItemSize = (windowWidth - 30) / 2;
const tab2ItemSize = (windowWidth - 40) / 3;
const PullToRefreshDist = 150;

const Dashboard = () => {
    /**
     * stats
     */
    const [tabIndex, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'politics', title: "POLITICS" },
        { key: 'business', title: "BUSINESS" },
        { key: 'lifestyle', title: "LIFESTYLE" },
        { key: 'travel', title: "TRAVEL" },
        { key: 'sports', title: "SPORTS" }
    ]);
    const [canScroll, setCanScroll] = useState(true);
    const [tab1Data] = useState(Array(40).fill(0));
    const [tab2Data] = useState(Array(30).fill(0));


    const scrollY = useRef(new Animated.Value(0)).current;
    const headerScrollY = useRef(new Animated.Value(0)).current;
    // for capturing header scroll on Android
    const headerMoveScrollY = useRef(new Animated.Value(0)).current;
    const listRefArr = useRef([]);
    const listOffset = useRef({});
    const isListGliding = useRef(false);
    const headerScrollStart = useRef(0);
    const _tabIndex = useRef(0);
    const refreshStatusRef = useRef(false);


    const headerPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onStartShouldSetPanResponder: (evt, gestureState) => {
                headerScrollY.stopAnimation();
                syncScrollOffset();
                return false;
            },

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                headerScrollY.stopAnimation();
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderEnd: (evt, gestureState) => {
                handlePanReleaseOrEnd(evt, gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
                const curListRef = listRefArr.current.find(
                    (ref) => ref.key === routes[_tabIndex.current].key,
                );
                const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
                if (curListRef.value) {
                    // scroll up
                    if (headerScrollOffset > 0) {
                        curListRef.value.scrollToOffset({
                            offset: headerScrollOffset,
                            animated: false,
                        });
                        // start pull down
                    } else {
                        if (Platform.OS === 'ios') {
                            curListRef.value.scrollToOffset({
                                offset: headerScrollOffset / 3,
                                animated: false,
                            });
                        } else if (Platform.OS === 'android') {
                            if (!refreshStatusRef.current) {
                                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
                            }
                        }
                    }
                }
            },
            onShouldBlockNativeResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                headerScrollStart.current = scrollY._value;
            },
        }),
    ).current;

    /**
     * PanResponder for list in tab scene
     */
    const listPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                headerScrollY.stopAnimation();
                return false;
            },
            onShouldBlockNativeResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                headerScrollY.stopAnimation();
            },
        }),
    ).current;

    /**
     * effect
     */
    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });

        headerScrollY.addListener(({ value }) => {
            listRefArr.current.forEach((item) => {
                if (item.key !== routes[tabIndex].key) {
                    return;
                }
                if (value > HeaderHeight || value < 0) {
                    headerScrollY.stopAnimation();
                    syncScrollOffset();
                }
                if (item.value && value <= HeaderHeight) {
                    item.value.scrollToOffset({
                        offset: value,
                        animated: false,
                    });
                }
            });
        });
        return () => {
            scrollY.removeAllListeners();
            headerScrollY.removeAllListeners();
        };
    }, [routes, tabIndex]);

    /**
     *  helper functions
     */
    const syncScrollOffset = () => {
        const curRouteKey = routes[_tabIndex.current].key;

        listRefArr.current.forEach((item) => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };

    const startRefreshAction = () => {
        if (Platform.OS === 'ios') {
            listRefArr.current.forEach((listRef) => {
                listRef.value.scrollToOffset({
                    offset: -50,
                    animated: true,
                });
            });
            refresh().finally(() => {
                syncScrollOffset();
                // do not bounce back if user scroll to another position
                if (scrollY._value < 0) {
                    listRefArr.current.forEach((listRef) => {
                        listRef.value.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                    });
                }
            });
        } else if (Platform.OS === 'android') {
            Animated.timing(headerMoveScrollY, {
                toValue: -150,
                duration: 300,
                useNativeDriver: true,
            }).start();
            refresh().finally(() => {
                Animated.timing(headerMoveScrollY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    const handlePanReleaseOrEnd = (evt, gestureState) => {
        // console.log('handlePanReleaseOrEnd', scrollY._value);
        syncScrollOffset();
        headerScrollY.setValue(scrollY._value);
        if (Platform.OS === 'ios') {
            if (scrollY._value < 0) {
                if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
                    startRefreshAction();
                } else {
                    // should bounce back
                    listRefArr.current.forEach((listRef) => {
                        listRef.value.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                    });
                }
            } else {
                if (Math.abs(gestureState.vy) < 0.2) {
                    return;
                }
                Animated.decay(headerScrollY, {
                    velocity: -gestureState.vy,
                    useNativeDriver: true,
                }).start(() => {
                    syncScrollOffset();
                });
            }
        } else if (Platform.OS === 'android') {
            if (
                headerMoveScrollY._value < 0 &&
                headerMoveScrollY._value / 1.5 < -PullToRefreshDist
            ) {
                startRefreshAction();
            } else {
                Animated.timing(headerMoveScrollY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
        // console.log('onMomentumScrollEnd'); 
    };

    const onScrollEndDrag = (e) => {
        syncScrollOffset();

        const offsetY = e.nativeEvent.contentOffset.y;
        // console.log('onScrollEndDrag', offsetY);
        // iOS only
        if (Platform.OS === 'ios') {
            if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
                startRefreshAction();
            }
        }

        // check pull to refresh
    };

    const refresh = async () => {
        console.log('-- start refresh');
        refreshStatusRef.current = true;
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done');
            }, 2000);
        }).then((value) => {
            console.log('-- refresh done!');
            refreshStatusRef.current = false;
        });
    };

    /**
     * render Helper
     */
    const renderHeader = () => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [0, - HeaderHeight],
            extrapolateRight: 'clamp',
            // extrapolate: 'clamp',
        });
        return (
            <Animated.View
                {...headerPanResponder.panHandlers}
                style={[styles.header, { transform: [{ translateY: y }] }]}>
                <LatestNews />
            </Animated.View>
        );
    };

    const rednerTabItem = ({ item, index }) => {
        return <ListCard
            {...item}
            style={{
                marginTop: index > 0 ? 10 : 10
            }}
        />
    };

    const renderLabel = ({ route, focused }) => {
        return (
            <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>
                {route.title}
            </Text>
        );
    };

    const renderScene = ({ route }) => {
        const focused = route.key === routes[tabIndex].key;
        const data = categoryNews?.[route.key];


        return (
            <Animated.FlatList
                scrollToOverflowEnabled={true}
                // scrollEnabled={canScroll}
                {...listPanResponder.panHandlers}
                numColumns={1}
                ref={(ref) => {
                    if (ref) {
                        const found = listRefArr.current.find((e) => e.key === route.key);
                        if (!found) {
                            listRefArr.current.push({
                                key: route.key,
                                value: ref,
                            });
                        }
                    }
                }}
                scrollEventThrottle={16}
                onScroll={
                    focused
                        ? Animated.event(
                            [
                                {
                                    nativeEvent: { contentOffset: { y: scrollY } },
                                },
                            ],
                            { useNativeDriver: true },
                        )
                        : null
                }
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => <View style={{ height: 10 }} />}
                contentContainerStyle={{
                    paddingTop: HeaderHeight + TabBarHeight,
                    paddingHorizontal: 10,
                    minHeight: windowHeight - SafeStatusBar + HeaderHeight,
                }}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={rednerTabItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    };

    const renderTabBar = (props) => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [HeaderHeight, 0],
            // extrapolate: 'clamp',
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View
                style={{
                    top: 0,
                    zIndex: 999,
                    position: 'absolute',
                    transform: [{ translateY: y }],
                    width: '100%',
                }}>
                <TabBar
                    {...props}
                    onTabPress={({ route, preventDefault }) => {
                        if (isListGliding.current) {
                            preventDefault();
                        }
                    }}
                    style={styles.tab}
                    renderLabel={renderLabel}
                    indicatorStyle={styles.indicator}
                />
            </Animated.View>
        );
    };

    const renderTabView = () => {
        return (
            <TabView
                onSwipeStart={() => setCanScroll(false)}
                onSwipeEnd={() => setCanScroll(true)}
                onIndexChange={(id) => {
                    _tabIndex.current = id;
                    setIndex(id);
                }}
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                initialLayout={{
                    height: 0,
                    width: windowWidth,
                }}
            />
        );
    };

    const renderCustomRefresh = () => {
        // headerMoveScrollY
        return Platform.select({
            ios: (
                <AnimatedIndicator
                    style={{
                        top: -50,
                        position: 'absolute',
                        alignSelf: 'center',
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-100, 0],
                                    outputRange: [120, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    }}
                    animating
                />
            ),
            android: (
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateY: headerMoveScrollY.interpolate({
                                    inputRange: [-300, 0],
                                    outputRange: [150, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                        backgroundColor: '#eee',
                        height: 38,
                        width: 38,
                        borderRadius: 19,
                        borderWidth: 2,
                        borderColor: '#ddd',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        top: -50,
                        position: 'absolute',
                    }}>
                    <ActivityIndicator animating />
                </Animated.View>
            ),
        });
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={{
                flex: 1
            }}>
                {renderTabView()}
                {renderHeader()}
                {/* {renderCustomRefresh()} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        height: HeaderHeight,
        width: '100%',
        position: 'absolute',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    label: { fontSize: 16, color: '#222' },
    tab: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#FFCC80',
        height: TabBarHeight,
    },
    indicator: { backgroundColor: '#222' },
});

export default Dashboard;