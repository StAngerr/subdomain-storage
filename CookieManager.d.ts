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
     */
    addCookie(key: string, value: string): void;
    /**
     * Removes a cookie with the specified key.
     * @param {string} key - The key for the cookie to be removed.
     */
    removeCookie(key: string): void;
    /**
     * Clears all cookies that match the prefix.
     */
    clearCookies(): void;
}
export default CookieManager;
