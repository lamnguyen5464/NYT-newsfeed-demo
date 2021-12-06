import { useEffect, useState, useCallback } from 'react';
import { ApiHelper } from '@helpers';
import { ISectionItem } from './Home.types';

const SECTION_OPTIONS = [
    'World',
    'Arts',
    'Opinion',
    'Science',
    'Sports',
    'Weather',
    'Cars',
    'Funny',
];

const useHome = () => {
    useEffect(() => {}, []);

    const [sections, setSection] = useState<number>(0);

    const onToggleSection = useCallback(
        (_index: number) => {
            setSection(_index);
        },
        [sections]
    );

    const fetchData = () => {
        ApiHelper.getAllStories().then(res => {});
    };

    return { SECTION_OPTIONS, sections, onToggleSection };
};

export default useHome;
