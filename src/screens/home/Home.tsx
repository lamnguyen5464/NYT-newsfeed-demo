import React, { useCallback, useMemo } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    View,
    TextInput,
    Animated,
    ActivityIndicator,
} from 'react-native';
import useHome from './useHome';
import { CategorySection, ItemStory, AnimatedHeader } from '@components';
import { Colors, DefaultSize, TextSize } from '@utils';
import { useHeaderHeight } from '@react-navigation/stack';
import { NavigationScreenProp } from '@react-navigation';

interface IHome {
    navigation: NavigationScreenProp<any, any>;
}

const Home = (props: IHome) => {
    const { navigation } = props;

    const {
        SECTION_OPTIONS,
        TOP_OFFSET,
        //ref
        refHeader,
        refListStories,
        refScrollToTopOffset,

        sections,
        onToggleSection,
        keywordInput,
        setKeywordInput,
        addNewKeyWord,
        listKeywords,
        listStories,
        onScrollToEnd,
        numberOfStories,

        //scroll to top button
        scrollToTop,
        hideScrollToTop,
        showScrollToTop,
    } = useHome();

    const renderSection = () => (
        <View
            style={[
                styles.container_section,
                styles.shadow,
                { paddingTop: useHeaderHeight() || 92 },
            ]}
        >
            <Text style={styles.text_seciton}>Section</Text>
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    bounces={false}
                    data={SECTION_OPTIONS || null}
                    keyExtractor={(item, index) => `section ${index}${item}${item}`}
                    renderItem={({ item, index }) => {
                        const isSelected = index === sections;
                        return (
                            <TouchableOpacity
                                onPress={() => onToggleSection(index)}
                                activeOpacity={0.8}
                                style={styles.section_item}
                            >
                                <CategorySection content={item} isSelected={isSelected} />
                            </TouchableOpacity>
                        );
                    }}
                    numColumns={Math.ceil(SECTION_OPTIONS?.length / 2)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    );

    const renderKeyWordsInput = () => {
        return (
            <View style={[styles.container_keywords, styles.shadow]}>
                <TextInput
                    onChangeText={setKeywordInput}
                    value={keywordInput}
                    placeholder={'Input keywords here'}
                    placeholderTextColor={Colors.black_10}
                    numberOfLines={1}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={addNewKeyWord}
                    style={[styles.bt_add_keyword, styles.shadow]}
                >
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderListKeywords = () =>
        !!listKeywords.length ? (
            <Text style={styles.keywords}>Keywords: {listKeywords.join(', ')}.</Text>
        ) : null;

    const HeaderComponents = (
        <>
            {renderSection()}
            {renderKeyWordsInput()}
            {renderListKeywords()}
        </>
    );

    const renderLoading = () => <ActivityIndicator style={styles.loading} />;

    const renderListStories = () => (
        <View style={styles.container_stories}>
            <FlatList
                bounces={false}
                ListEmptyComponent={renderLoading}
                ListHeaderComponent={HeaderComponents}
                ListFooterComponent={listStories?.length ? renderLoading : null}
                ref={refListStories}
                data={listStories.slice(0, numberOfStories)}
                keyExtractor={(item, index) => `section ${index}${item?.title ?? ''}${item}`}
                renderItem={({ item, index }) => {
                    return <ItemStory {...item} />;
                }}
                onEndReached={onScrollToEnd}
                onEndReachedThreshold={0.2}
                onScroll={e => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    if (offsetY > TOP_OFFSET) {
                        showScrollToTop();
                    } else {
                        hideScrollToTop();
                    }

                    refHeader.current?.setOpacity(Math.min(1, offsetY / TOP_OFFSET));
                }}
            />
        </View>
    );

    const renderScrollToButton = () => (
        <Animated.View
            style={[
                styles.container_to_top,
                styles.shadow,
                {
                    transform: [
                        {
                            translateY: refScrollToTopOffset.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, -100],
                            }),
                        },
                    ],
                },
            ]}
        >
            <TouchableOpacity onPress={scrollToTop}>
                <Text>Scroll to top ⬆️</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderTabBar = () => (
        <AnimatedHeader ref={refHeader} navigation={navigation} title="NYT News Feed" />
    );

    return (
        <View style={styles.container}>
            {renderTabBar()}
            {renderListStories()}
            {renderScrollToButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    text_seciton: {
        marginLeft: DefaultSize.M,
        fontWeight: 'bold',
        color: Colors.black_17,
        fontSize: TextSize.H2,
    },
    container_section: {
        backgroundColor: Colors.black_05,
        paddingVertical: DefaultSize.M,
    },
    section_item: {
        marginLeft: DefaultSize.M,
        marginTop: DefaultSize.S,
    },
    container_keywords: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: DefaultSize.M,
        backgroundColor: Colors.white,
        marginHorizontal: DefaultSize.M,
        padding: DefaultSize.M,
        borderRadius: DefaultSize.S,
    },
    bt_add_keyword: {
        backgroundColor: Colors.black_04,
        padding: DefaultSize.S,
        alignSelf: 'center',
        borderRadius: DefaultSize.S,
    },
    keywords: {
        fontStyle: 'italic',
        marginLeft: DefaultSize.L,
        marginBottom: DefaultSize.M,
    },
    container_stories: {
        flex: 1,
        marginTop: DefaultSize.M,
        backgroundColor: Colors.blue_09,
    },
    container_to_top: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        padding: DefaultSize.M,
        borderRadius: DefaultSize.M,
        backgroundColor: Colors.blue_08,
    },
    loading: {
        marginVertical: DefaultSize.XL,
    },
});

export default Home;
