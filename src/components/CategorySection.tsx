import React, { memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, DefaultSize } from '@utils';

interface ICategorySection {
    content: string;
    isSelected?: boolean;
    onPress?: () => void;
}

const CategorySection: React.FC<ICategorySection> = ({
    isSelected = false,
    content,
    onPress,
}: ICategorySection) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={[styles.container, isSelected && styles.container_active]}
        >
            <Text style={[styles.content, isSelected && styles.content_active]}>{content}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: DefaultSize.S,
        paddingHorizontal: DefaultSize.XL,
        backgroundColor: Colors.white,
        borderWidth: DefaultSize.XXS,
        borderRadius: DefaultSize.S,
        borderColor: Colors.black_10,
    },

    container_active: {
        borderColor: Colors.blue_05,
    },

    content: {
        fontWeight: 'bold',
        color: Colors.black_10,
    },

    content_active: {
        color: Colors.blue_05,
    },
});

export default memo(CategorySection);
