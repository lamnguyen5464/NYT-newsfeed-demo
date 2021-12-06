import React from 'react';
import {
    SafeAreaView,
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
import { CategorySection, ItemStory } from '@components';
import { Colors, DefaultSize, TextSize } from '@utils';

const Home = () => {
    const {
        SECTION_OPTIONS,
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
        <View style={[styles.container_section, styles.shadow]}>
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
                    keyboardType={'default'}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={addNewKeyWord}
                    style={[styles.bt_add_keyword, styles.shadow]}
                >
                    <Text>add</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderListKeywords = () => (
        <Text style={styles.keywords}>{listKeywords.join(', ')}.</Text>
    );

    const renderHeaderComponents = () => (
        <>
            {renderSection()}
            {renderKeyWordsInput()}
            {renderListKeywords()}
        </>
    );

    const renderLoading = () => <ActivityIndicator />;

    const renderListStories = () => (
        <View style={styles.container_stories}>
            <FlatList
                ListHeaderComponent={renderHeaderComponents}
                ListEmptyComponent={renderLoading}
                ListFooterComponent={renderLoading}
                ref={refListStories}
                data={listStories.slice(0, numberOfStories)}
                keyExtractor={(item, index) => `section ${index}${item?.title ?? ''}${item}`}
                renderItem={({ item, index }) => {
                    return <ItemStory {...item} />;
                }}
                onEndReached={onScrollToEnd}
                onEndReachedThreshold={0.2}
                onScroll={e => {
                    if (e.nativeEvent.contentOffset.y > 200) {
                        showScrollToTop();
                    } else {
                        hideScrollToTop();
                    }
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

    return (
        <SafeAreaView style={styles.container}>
            {renderListStories()}
            {renderScrollToButton()}
        </SafeAreaView>
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
        fontSize: TextSize.H4,
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
        marginTop: DefaultSize.M,
        backgroundColor: Colors.white,
        marginHorizontal: DefaultSize.M,
        padding: DefaultSize.M,
        borderRadius: DefaultSize.S,
    },
    bt_add_keyword: {
        backgroundColor: Colors.black_04,
        padding: DefaultSize.S,
        borderRadius: DefaultSize.S,
    },
    keywords: {
        fontStyle: 'italic',
        marginLeft: DefaultSize.M,
        marginTop: DefaultSize.M,
    },
    container_stories: {
        flex: 1,
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
});

export default Home;
