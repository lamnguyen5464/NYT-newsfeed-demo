import React, { useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Animated, Image, Text, View } from 'react-native';
import { DefaultSize, Colors, TextSize } from '../utils';
import { useHeaderHeight, StackNavigationProp } from '@react-navigation/stack';
export interface IAnimatedHeader {
    navigation?: StackNavigationProp<any, any>;
    title: string;
}

export interface IRefAnimatedHeader {
    setOpacity: (value: number) => void;
}

const AnimatedHeader = forwardRef((props: IAnimatedHeader, ref: React.Ref<IRefAnimatedHeader>) => {
    const { navigation, title = '' } = props;
    const headerHeight = useRef(useHeaderHeight() || 98).current;
    const opacityAnimated = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        navigation?.setOptions?.({
            headerShown: false,
        });
    }, []);

    const setOpacity = (value: number) => {
        opacityAnimated.setValue(value);
    };

    useImperativeHandle(ref, () => ({
        setOpacity,
    }));

    const _renderTitle = () => <Text style={styles.title}>{title}</Text>;

    return (
        <>
            <View style={[styles.transparent_container, { height: headerHeight || 0 }]}></View>
            <Animated.View
                style={[styles.container, { height: headerHeight || 0, opacity: opacityAnimated }]}
            >
                {_renderTitle()}
            </Animated.View>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.blue_05,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomLeftRadius: DefaultSize.XS,
        borderBottomRightRadius: DefaultSize.XS,
        paddingBottom: DefaultSize.M,

        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: DefaultSize.XXS,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    title: {
        marginLeft: DefaultSize.M,
        fontWeight: 'bold',
        fontSize: TextSize.H4,
        color: Colors.white,
    },
    transparent_container: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 9,
        paddingBottom: DefaultSize.M,
    },
    ic_left: {
        width: DefaultSize.L,
        height: DefaultSize.L,
    },
    ic_right: {
        width: DefaultSize.L,
        height: DefaultSize.L,
        marginRight: DefaultSize.XL,
    },
});

export default AnimatedHeader;
