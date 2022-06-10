import { View, FlatList, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import CategoryCard from './../CategoryCard';
import { useNavigation, useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets';

interface CategoryOptions {
    style? : StyleProp<ViewStyle>
}

export default function Categories(props : CategoryOptions) {

    const navigation = useNavigation();
    const theme = useTheme();
    const arrayData = Array(10).fill("Politics");

    const renderItem = ({item, index}) => {
        return <CategoryCard
            title={item}
            active={index == 0}
        />
    }

    const footerArrow = () => {
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Text>More</Text>
                <FastImage
                    source={images?.[theme.dark ? "dark" : "light"]?.arrow}
                    style={{
                        width : 10,
                        height : 10
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        )
    }

    return (
        <FlatList
            data={arrayData}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={[{
                paddingTop:25
            }, props.style]}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={footerArrow}
        />
    )
}