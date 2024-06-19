import SubdomainStorage, { StorageConfig } from '../SubdomainStorage';
import CookieManager from '../CookieManager';
import { convertValueToString } from '../utils';

jest.mock('../CookieManager', () => {
    return jest.fn().mockImplementation(() => ({
        getCookie: jest.fn().mockReturnValue({}),
        addCookie: jest.fn(),
        removeCookie: jest.fn(),
        clearCookies: jest.fn(),
        cookiePrefix: 'mocked_prefix',
        domain: 'mocked_domain',
        expires: new Date(),
    }));
});

describe('SubdomainStorage', () => {
    let storage: typeof SubdomainStorage;

    beforeEach(() => {
        storage = SubdomainStorage as typeof SubdomainStorage; // Cast to SubdomainStorage for type safety
    });

    afterEach(() => {
        jest.clearAllMocks();
        storage.clear();
    });

    it('should initialize with default values', () => {
        expect(storage.length).toBe(0);
    });

    it('should set configuration correctly', () => {
        const config: StorageConfig = {
            domain: 'test-domain.com',
            cookiePrefix: 'test_prefix',
            expireTime: new Date('2024-06-06'),
        };

        storage.setConfig(config);

        expect(storage['cookieStorage'].cookiePrefix).toBe('test_prefix');
        expect(storage['cookieStorage'].domain).toBe('test-domain.com');
        expect(storage['cookieStorage'].expires).toEqual(
            new Date('2024-06-06'),
        );
    });

    it('should add and retrieve items correctly', () => {
        storage.setItem('key1', 'value1');
        // @ts-ignore
        storage.setItem('key2', { prop: 'value2' });

        expect(storage.getItem('key1')).toBe('value1');
        expect(storage.getItem('key2')).toBe('[object Object]');
        expect(storage.length).toBe(2);
    });

    it('should remove items correctly', () => {
        storage.setItem('key1', 'value1');
        storage.removeItem('key1');

        expect(storage.getItem('key1')).toBeNull();
        expect(storage.length).toBe(0);
        expect(storage['cookieStorage'].removeCookie).toHaveBeenCalledWith(
            'key1',
        );
    });

    it('should clear items correctly', () => {
        storage.setItem('key1', 'value1');
        storage.clear();

        expect(storage.getItem('key1')).toBeNull();
        expect(storage.length).toBe(0);
        expect(storage['cookieStorage'].clearCookies).toHaveBeenCalled();
    });
});
