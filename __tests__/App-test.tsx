/**
 * @format
 */

import 'react-native';

// import { ApiHelper, Models } from '../src/helpers';
import ApiHelper from '../src/helpers/api/ApiHelper';
import * as Models from '../src/helpers/models';
import { StringUtils } from '../src/utils';

// StringUtils

describe('Test StringUtils.upperWord', () => {
    const TEST_CASE = [
        { input: 'arts', output: 'Arts' },
        { input: 'aRTs', output: 'Arts' },
        { input: 'ARTS', output: 'Arts' },
    ];
    TEST_CASE.forEach(({ input, output }, index) => {
        test(`Test case ${index}: Upper first letter of ${input}`, () => {
            expect(StringUtils.upperWord(input)).toBe(output);
        });
    });
});

describe('Test StringUtils.isMatching', () => {
    const TEST_CASE = [
        {
            input: [
                'Burnham',
                'From Bo Burnham to “We Are Lady Parts,” the best in television this year offered ingenuity, humor, defiance and hope',
            ],
            output: true,
        },
        { input: ['Burnham', 'By James Poniewozik, Mike Hale and Margaret Lyons'], output: false },
        {
            input: ['Galleries', 'Signs of Sea Change at Art Basel Miami: More Galleries of Color'],
            output: true,
        },
    ];
    TEST_CASE.forEach(({ input, output }, index) => {
        const [input1, input2] = input;
        test(`Test case ${index}:`, () => {
            expect(StringUtils.isMatching(input2, input1)).toBe(output);
        });
    });
});

// API test
describe('Test API', () => {
    const TEST_CASE = ['arts', 'sports', 'movies', 'BoOks'];
    TEST_CASE.forEach((item, index) => {
        test(`Test case ${index}: ${item}`, () => {
            return ApiHelper.getStoriesOfSection(item).then(res => {
                expect(res).toBeTruthy();
            });
        });
    });
});
