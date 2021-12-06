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

    const [sections, setSection] = useState<ISectionItem[]>(
        SECTION_OPTIONS.map(item => <ISectionItem>{ content: item, isSelected: false })
    );

    const onToggleSection = useCallback(
        (_index: number) => {
            setSection(
                sections.map((item, index) =>
                    index === _index
                        ? <ISectionItem>{ content: item.content, isSelected: !item.isSelected }
                        : item
                )
            );
        },
        [sections]
    );

    const fetchData = () => {
        ApiHelper.getAllStories().then(res => {});
    };

    return { sections, onToggleSection };
};

export default useHome;
