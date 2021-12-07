import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, DefaultSize, DeviceUtils } from '@utils';

const OfflineBanner = forwardRef((_, ref) => {
    const offsetAnimated = useRef(new Animated.Value(0)).current;

    const show = () => {
        Animated.timing(offsetAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const hide = () => {
        Animated.timing(offsetAnimated, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateY: offsetAnimated.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-100, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <Text style={styles.txt}>You are offline, man :(</Text>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        paddingVertical: DefaultSize.M,
        alignItems: 'center',

        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: DefaultSize.XXS,
        shadowOpacity: 0.3,
        elevation: 2,

        backgroundColor: Colors.error,
        paddingTop: DeviceUtils.isIphoneX() ? 48 : DefaultSize.M,
    },
    txt: {
        color: Colors.white,
        fontWeight: 'bold',
    },
});

export default OfflineBanner;
