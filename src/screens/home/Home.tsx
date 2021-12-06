import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import useHome from './useHome';
import { CategorySection } from '@components';
import { Colors, DefaultSize, TextSize } from '@utils';
import { ISectionItem } from './Home.types';

const Home = () => {
    const { sections, onToggleSection } = useHome();

    const renderSection = () => (
        <View style={styles.container_section}>
            <Text style={styles.text_seciton}>Section</Text>
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    bounces={false}
                    data={sections || null}
                    keyExtractor={(item, index) =>
                        `section ${index}${item.isSelected}${item.content}`
                    }
                    renderItem={({ item, index }) => {
                        const { content = '', isSelected = false } = item;
                        return (
                            <View style={styles.section_item}>
                                <CategorySection
                                    onPress={() => onToggleSection(index)}
                                    content={content}
                                    isSelected={isSelected}
                                />
                            </View>
                        );
                    }}
                    numColumns={Math.ceil(sections?.length / 2)}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    );

    return <SafeAreaView style={styles.container}>{renderSection()}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_seciton: {
        marginLeft: DefaultSize.M,
        fontWeight: 'bold',
        color: Colors.black_10,
        fontSize: TextSize.H4,
    },
    container_section: {},
    section_item: {
        marginLeft: DefaultSize.M,
        marginTop: DefaultSize.S,
    },
});

export default Home;
