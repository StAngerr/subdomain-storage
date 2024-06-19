import { convertValueToString } from '../utils';

describe('convertValueToString utility tests', () => {
    it('should convert a number to a string', () => {
        expect(convertValueToString(123)).toBe('123');
    });

    it('should convert a boolean to a string', () => {
        expect(convertValueToString(true)).toBe('true');
    });

    it('should convert an object to a JSON string', () => {
        expect(convertValueToString({ key: 'value' })).toBe('[object Object]');
    });

    it('should convert an array to a JSON string', () => {
        expect(convertValueToString([1, 2, 3])).toBe('1,2,3');
    });

    it('should convert null to "null"', () => {
        expect(convertValueToString(null)).toBe('null');
    });

    it('should convert undefined to "undefined"', () => {
        expect(convertValueToString(undefined)).toBe(undefined);
    });

    it('should use the toString method if available', () => {
        const obj = {
            toString: () => 'custom string',
        };
        expect(convertValueToString(obj)).toBe('custom string');
    });
});
