import { useEffect, useState, useCallback } from 'react';
import { ApiHelper } from '@helpers';
import { ISectionItem } from './Home.types';
import { StringUtils } from '@utils';
import { IItemStory } from '@component/IItemStory';

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

const useHome = () => {
    useEffect(() => {}, []);

    const [sections, setSection] = useState<number>(0);
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [listKeywords, setListKeywords] = useState<string[]>([]);
    const [listStories, setListStories] = useState<IItemStory[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const onToggleSection = useCallback(
        (_index: number) => {
            setSection(_index);
        },
        [sections]
    );

    const addNewKeyWord = () => {
        if (!!keywordInput) {
            setListKeywords([keywordInput, ...listKeywords]);
            setKeywordInput('');
        }
    };

    const fetchData = () => {
        ApiHelper.getAllStories().then(res => {
            const { results = [] } = res || {};
            setListStories(results);
        });
    };

    return {
        SECTION_OPTIONS: SECTION_OPTIONS.map(item => StringUtils.upperWord(item)),
        sections,
        onToggleSection,
        keywordInput,
        setKeywordInput,
        addNewKeyWord,
        listKeywords,
        listStories,
    };
};

export default useHome;
