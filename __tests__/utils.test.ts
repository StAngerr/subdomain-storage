import { configToCookieString, convertValueToString, isNil } from '../utils';
import { CookieAttributes } from '../CookieManager';

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

describe('isNil utility tests', () => {
    it('should return true for null', () => {
        expect(isNil(null)).toBe(true);
    });

    it('should return true for undefined', () => {
        expect(isNil(undefined)).toBe(true);
    });

    it('should return false for a number', () => {
        expect(isNil(123)).toBe(false);
    });

    it('should return false for a string', () => {
        expect(isNil('')).toBe(false);
    });

    it('should return false for an object', () => {
        expect(isNil({})).toBe(false);
    });

    it('should return false for an array', () => {
        expect(isNil(0)).toBe(false);
    });
});

describe('configToCookieString utility tests', () => {
    it('should convert a config object to a cookie string', () => {
        const config = {
            SameSite: 'None',
            Secure: true,
            Path: '/',
        } as CookieAttributes;
        expect(configToCookieString(config)).toBe(
            'SameSite=None; Secure; Path=/;',
        );
    });

    it('should handle boolean values correctly', () => {
        const config = { Secure: true, HttpOnly: false } as CookieAttributes;
        expect(configToCookieString(config)).toBe('Secure;');
    });

    it('should handle mixed types correctly', () => {
        const config = {
            SameSite: 'Lax',
            Secure: true,
            MaxAge: 3600,
        } as CookieAttributes;
        expect(configToCookieString(config)).toBe(
            'SameSite=Lax; Secure; MaxAge=3600;',
        );
    });

    it('should return an empty string for an empty config object', () => {
        expect(configToCookieString({})).toBe('');
    });
});
