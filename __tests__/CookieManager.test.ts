import CookieManager from '../CookieManager';

const mockLocation = {
    hostname: 'test.com',
};
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
    value: mockLocation,
});
let cookies = {};

// @ts-ignore
Object.defineProperty(document, 'cookie', {
    get: jest.fn(() =>
        Object.keys(cookies) // @ts-ignore
            .map((key) => `${key}=${cookies[key]}`)
            .join('; '),
    ),
    set: jest.fn((value) => {
        const [key, val] = value.split('='); // @ts-ignore
        cookies[key] = val;
    }),
    configurable: true,
});
describe('CookieManager class tests', () => {
    let cookieManager: CookieManager;

    beforeEach(() => {
        cookieManager = new CookieManager();
    });

    afterEach(() => {
        cookieManager.clearCookies();
    });

    describe('constructor tests', () => {
        it('should initialize with default values', () => {
            expect(cookieManager.cookiePrefix).toBe('sds_');
            expect(cookieManager.domain).toBe(location.hostname);

            const expires = cookieManager.expires;
            const expectedExpires = new Date();
            expectedExpires.setFullYear(new Date().getFullYear() + 50);

            expect(expires.getFullYear()).toBe(expectedExpires.getFullYear());
            expect(expires.getMonth()).toBe(expectedExpires.getMonth());
            expect(expires.getDate()).toBe(expectedExpires.getDate());
        });
    });

    describe('getCookie method tests', () => {
        it('should retrieve cookies matching the prefix', () => {
            document.cookie = 'sds_test1=testValue1';

            const cookies = cookieManager.getCookie();
            expect(cookies).toHaveProperty('test1');
            expect(cookies['test1']).toBe('testValue1');
        });

        it('should handle cookies with special characters', () => {
            document.cookie = 'sds_test2=%3C%3E%20%26%3D';

            const cookies = cookieManager.getCookie();
            expect(cookies).toHaveProperty('test2');
            expect(cookies['test2']).toBe('<> &=');
        });

        it('should return an empty object if no matching cookies found', () => {
            document.cookie = '';
            const cookies = cookieManager.getCookie();
            expect(cookies).toEqual({});
        });
    });

    describe('addCookie еуіеі', () => {
        it('should add a cookie with specified key and value', () => {
            cookieManager.addCookie('test3', 'value3');
            const cookies = cookieManager.getCookie();
            expect(cookies).toHaveProperty('test3');
            expect(cookies['test3']).toBe('value3');
        });
    });

    describe('removeCookie', () => {
        it('should remove a cookie with specified key', () => {
            document.cookie = 'sds_test5=testValue5';

            cookieManager.removeCookie('test5');
            const cookies = cookieManager.getCookie();
            expect(cookies).not.toHaveProperty('test5');
        });
    });

    describe('clearCookies', () => {
        it('should remove all cookies matching the prefix', () => {
            document.cookie = 'sds_test6_1=testValue6_1';
            document.cookie = 'sds_test6_2=testValue6_2';

            cookieManager.clearCookies();
            const cookies = cookieManager.getCookie();
            expect(cookies).toEqual({});
        });
    });
});
