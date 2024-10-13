export interface CookieAttributes {
    Domain?: string;
    Path?: string;
    Secure?: boolean;
    HTTPOnly?: boolean;
    SameSite?: 'Strict' | 'Lax' | 'None';
    Partitioned?: boolean;
}
declare class CookieManager {
    /**
     * The prefix to use for cookie keys.
     * @private
     * @type {string}
     */
    private _cookiePrefix;
    /**
     * The subdomain for which the cookies are valid.
     * @private
     * @type {string}
     */
    private _domain;
    /**
     * The expiration date for the cookies.
     * @private
     * @type {Date}
     */
    private _expires;
    /**
     * Default attributes for the cookies.
     * @private
     * @type {CookieAttributes}
     * @property {string} SameSite - The SameSite attribute for the cookies, default is 'None'.
     * @property {boolean} Secure - Indicates if the cookies should be secure, default is true.
     * @property {string} Path - The path for which the cookies are valid, default is '/'.
     */
    private _attributes;
    constructor();
    /**
     * Gets the domain for which the cookies are valid.
     * @returns {string} The domain.
     */
    get domain(): string;
    /**
     * Sets the domain for which the cookies are valid.
     * @param {string} value - The domain.
     */
    set domain(value: string);
    /**
     * Gets the prefix used for cookie keys.
     * @returns {string} The cookie prefix.
     */
    get cookiePrefix(): string;
    /**
     * Sets the prefix used for cookie keys.
     * @param {string} value - The cookie prefix.
     */
    set cookiePrefix(value: string);
    /**
     * Gets the expiration date for the cookies.
     * @returns {Date} The expiration date.
     */
    get expires(): Date;
    /**
     * Sets the expiration date for the cookies.
     * @param {Date} value - The expiration date.
     */
    set expires(value: Date);
    /**
     * Retrieves all cookies that match the prefix as an object.
     * @returns {{ [key: string]: string }} An object containing the cookies.
     */
    getCookie(): {
        [key: string]: string;
    };
    /**
     * Adds a cookie with a specified key and value.
     * @param {string} key - The key for the cookie.
     * @param {string} value - The value for the cookie.
     * @param {CookieAttributes} [config={}] - Optional configuration for the cookie attributes.
     */
    addCookie(key: string, value: string, config?: CookieAttributes): void;
    /**
     * Removes a cookie with the specified key.
     * @param {string} key - The key for the cookie to be removed.
     * @param {CookieAttributes} [config={}] - Optional configuration for the cookie attributes.
     */
    removeCookie(key: string, config?: CookieAttributes): void;
    /**
     * Clears all cookies that match the prefix.
     */
    clearCookies(): void;
    /**
     * Sets the default attributes for the cookies.
     * @param {CookieAttributes} config - The configuration object containing the attributes to set.
     * @returns {void}
     */
    setAttributes(config: CookieAttributes): void;
}
export default CookieManager;
