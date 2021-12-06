import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import useHome from './useHome';
import { CategorySection } from '@components';
import { Colors, DefaultSize, TextSize } from '@utils';

const Home = () => {
    const { SECTION_OPTIONS, sections, onToggleSection } = useHome();

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

    return <SafeAreaView style={styles.container}>{renderSection()}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

export default Home;
