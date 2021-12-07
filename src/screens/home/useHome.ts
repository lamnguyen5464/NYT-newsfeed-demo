import { useEffect, useState, useCallback, useRef } from 'react';
import { ApiHelper, Models } from '../../helpers';
import { ISectionItem } from './Home.types';
import { StringUtils } from '../../utils';
import { Animated, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { IRefAnimatedHeader } from '../../components/AnimatedHeader';
import { IRefOfflineBanner } from '../../components/OfflineBanner';

const SECTION_OPTIONS = [
    'arts',
    'automobiles',
    'books',
    'business',
    'fashion',
    'food',
    'health',
    'home',
    'insider',
    'magazine',
    'movies',
    'nyregion',
    'obituaries',
    'opinion',
    'politics',
    'realestate',
    'science',
    'sports',
    'sundayreview',
    'technology',
    'theater',
    't-magazine',
    'travel',
    'upshot',
    'us',
    'world',
];

const NUMBER_LOAD_STORIES = 10;

const KEY_STORAGE_SECTION = 'KEY_STORAGE_SECTION';

const useHome = () => {
    const refListStories = useRef<FlatList>(null);
    const refScrollToTopOffset = useRef<Animated.Value>(new Animated.Value(0));
    const refHeader = useRef<IRefAnimatedHeader>(null);
    const refOfflineBanner = useRef<IRefOfflineBanner>(null);

    const [sections, setSection] = useState<number>(0);
    const [keywordInput, setKeywordInput] = useState('');
    const [listKeywords, setListKeywords] = useState<string[]>([]);
    const [listStories, setListStories] = useState<Models.IItemStory[]>([]);
    const [numberOfStories, setNumberOfStories] = useState<number>(NUMBER_LOAD_STORIES);

    useEffect(() => {
        getFromStorage().then(res => {
            onToggleSection(parseInt(res || '0'));
        });
    }, []);

    useEffect(() => {
        const removeNetworkListener = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                refOfflineBanner.current?.hide();
            } else {
                refOfflineBanner.current?.show();
            }
        });
        return () => {
            removeNetworkListener?.();
        };
    }, []);

    const getFromStorage = () => {
        return AsyncStorage.getItem(KEY_STORAGE_SECTION);
    };

    const setToStorage = (sectionIndex: number) => {
        AsyncStorage.setItem(KEY_STORAGE_SECTION, sectionIndex?.toString());
    };

    const onToggleSection = useCallback(
        (_index: number) => {
            setSection(_index);
            setToStorage(_index);
            fetchData(SECTION_OPTIONS[_index]);
        },
        [sections]
    );

    const addNewKeyWord = () => {
        if (!!keywordInput) {
            setListKeywords([keywordInput, ...listKeywords]);
            setKeywordInput('');
        }
    };

    const clearListKeyWord = () => {
        setListKeywords([]);
    };

    const fetchData = (section: string) => {
        setNumberOfStories(NUMBER_LOAD_STORIES);
        setListStories([]);
        setListKeywords([]);
        ApiHelper.getStoriesOfSection(section).then(res => {
            const { results = [] } = <Models.ISectionStory>res || {};
            setListStories(results);
        });
    };

    const onScrollToEnd = () => {
        setTimeout(() => {
            setNumberOfStories(Math.min(numberOfStories + 5, listStories.length));
        }, 1000);
    };

    const scrollToTop = () => {
        refListStories.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const hideScrollToTop = () => {
        Animated.spring(refScrollToTopOffset.current, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const showScrollToTop = () => {
        Animated.spring(refScrollToTopOffset.current, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const getListStories = () => {
        return listStories.slice(0, numberOfStories).filter(item => {
            for (const keyword of listKeywords) {
                if (!StringUtils.isMatching(item?.title, keyword)) return false;
                console.log(item?.title, keyword);
            }
            return true;
        });
    };

    const isReachedEnd = () => {
        return numberOfStories >= getListStories()?.length;
    };

    return {
        SECTION_OPTIONS: SECTION_OPTIONS.map(item => StringUtils.upperWord(item)),
        TOP_OFFSET: 300,

        //ref
        refHeader,
        refListStories,
        refOfflineBanner,
        refScrollToTopOffset,

        sections,
        onToggleSection,
        keywordInput,
        setKeywordInput,
        addNewKeyWord,
        clearListKeyWord,
        listKeywords,
        listStories,
        onScrollToEnd,
        numberOfStories,

        //scroll to top button
        scrollToTop,
        hideScrollToTop,
        showScrollToTop,

        getListStories,
        isReachedEnd,
    };
};

export default useHome;
