import { getStringInfo, toUpperCase } from '../src/utils/utils';

describe('Utils test suite', () => {
    it('should return uppercase', () => {
        // arrange  sut -> system under test
        const sut = toUpperCase;
        const expected = 'AAABBB';
        // act
        const actual = sut('aaabbb');
        // assert
        expect(actual).toBe(expected);
    });

    describe('getStringInfo for My-String', () => {
        test('return correct length', () => {
            const actual = getStringInfo('My-String');
            expect(actual.characters).toHaveLength(9);
        });
        test('return correct lower case', () => {
            const actual = getStringInfo('My-String');
            expect(actual.lowerCase).toBe('my-string');
        });
        test('return correct upper case', () => {
            const actual = getStringInfo('My-String');
            expect(actual.upperCase).toBe('MY-STRING');
        });
        test('return correct characerts', () => {
            const actual = getStringInfo('My-String');
            expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
            expect(actual.characters).toContain<String>('M');
            expect(actual.characters).toEqual(expect.arrayContaining(['t', 'r', 'i', 'n', 'g', 'M', 'y', '-', 'S'])); // allows mixed order
        });
        test('return defined extra info', () => {
            const actual = getStringInfo('My-String');
            expect(actual.extraInfo).toBeDefined();
        });
        test('return correct extra info', () => {
            const actual = getStringInfo('My-String');
            expect(actual.extraInfo).toEqual({});
        });
    });

    // it('should return info for valid string', () => {
    //     // arrange  sut -> system under test
    //     // const sut = toUpperCase;
    //     // const expected = 'AAABBB';
    //     // act
    //     const actual = getStringInfo('My-String');
    //     // assert
    //     expect(actual.lowerCase).toBe('my-string'); //compare primitive values use toBe
    //     expect(actual.extraInfo).toEqual({}); //compare objects uses toEqual

    //     expect(actual.characters.length).toBe(9);
    //     expect(actual.characters).toHaveLength(9); //Same purpose but easier to read, more clean

    //     expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);

    //     expect(actual.characters).toContain<String>('M');

    //     expect(actual.characters).toEqual(expect.arrayContaining(['t', 'r', 'i', 'n', 'g', 'M', 'y', '-', 'S'])); // allows mixed order

    //     expect(actual.extraInfo).not.toBe(undefined); //Same purpose
    //     expect(actual.extraInfo).not.toBeUndefined(); //Same purpose
    //     expect(actual.extraInfo).toBeDefined(); //Same purpose

    //     expect(actual.extraInfo).toBeTruthy(); // not knowing the form of the object but are valid
    // });
});
