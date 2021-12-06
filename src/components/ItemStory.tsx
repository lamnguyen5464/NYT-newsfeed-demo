import { Colors, DefaultSize, TextSize, TimeUtils } from '@utils';
import React, { memo } from 'react';
import { View, StyleSheet, Image, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IItemStory {
    url?: string;
    title: string;
    section: string;
    byline?: string;
    published_date?: string;
    multimedia?: IMultimedia[];
}

interface IMultimedia {
    url?: string;
}

const ItemStory = (props: IItemStory) => {
    const { title = '', url = '', byline = '', published_date = '', multimedia } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                Linking.openURL(url);
            }}
            activeOpacity={0.8}
            style={[styles.container, styles.shadow]}
        >
            <Image source={{ uri: multimedia?.[0]?.url ?? DEFAULT_IMG }} style={styles.img} />
            <View style={styles.content}>
                <Text style={styles.title}>{title || 'Title'}</Text>
                <Text style={styles.subtitle}>{byline}</Text>
                <Text style={styles.subtitle}>
                    Published: {TimeUtils.formatDelta(published_date)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const DEFAULT_IMG =
    'https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: DefaultSize.M,
        marginHorizontal: DefaultSize.M,
        padding: DefaultSize.M,
        backgroundColor: Colors.white,
        borderRadius: DefaultSize.S,
    },
    img: {
        width: '30%',
        height: 'auto',
        aspectRatio: 1,
    },
    shadow: {
        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: DefaultSize.XXS,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    content: {
        width: '70%',
        paddingHorizontal: DefaultSize.S,
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: TextSize.Title,
    },
    subtitle: {
        fontSize: TextSize.SubTitle,
    },
});

export default memo(ItemStory);
