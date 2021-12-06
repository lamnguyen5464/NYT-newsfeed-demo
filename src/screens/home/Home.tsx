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
} from 'react-native';
import useHome from './useHome';
import { CategorySection } from '@components';
import { Colors, DefaultSize, TextSize } from '@utils';

const Home = () => {
    const {
        SECTION_OPTIONS,
        sections,
        onToggleSection,
        keywordInput,
        setKeywordInput,
        addNewKeyWord,
        listKeywords,
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

    return (
        <SafeAreaView style={styles.container}>
            {renderSection()}
            {renderKeyWordsInput()}
            {renderListKeywords()}
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
});

export default Home;
