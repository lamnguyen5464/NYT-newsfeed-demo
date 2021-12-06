import { useEffect, useState, useCallback, useRef } from 'react';
import { ApiHelper } from '@helpers';
import { ISectionItem } from './Home.types';
import { StringUtils } from '@utils';
import { IItemStory } from '@component/IItemStory';
import { Animated, FlatList } from 'react-native';

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

const useHome = () => {
    const refListStories = useRef<FlatList>(null);
    const refScrollToTopOffset = useRef<Animated.Value>(new Animated.Value(0));
    const refHeader = useRef(null);

    const [sections, setSection] = useState<number>(0);
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [listKeywords, setListKeywords] = useState<string[]>([]);
    const [listStories, setListStories] = useState<IItemStory[]>([]);
    const [numberOfStories, setNumberOfStories] = useState<number>(NUMBER_LOAD_STORIES);

    useEffect(() => {
        onToggleSection(0);
    }, []);

    const onToggleSection = useCallback(
        (_index: number) => {
            setSection(_index);
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

    const fetchData = (section: string) => {
        setNumberOfStories(NUMBER_LOAD_STORIES);
        setListStories([]);
        ApiHelper.getStoriesOfSection(section).then(res => {
            const { results = [] } = res || {};
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

    return {
        SECTION_OPTIONS: SECTION_OPTIONS.map(item => StringUtils.upperWord(item)),
        TOP_OFFSET: 300,

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
    };
};

export default useHome;
