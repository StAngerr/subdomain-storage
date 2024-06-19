class CookieManager {
    /**
     * The prefix to use for cookie keys.
     * @private
     * @type {string}
     */
    private _cookiePrefix: string = 'sds_';
    /**
     * The subdomain for which the cookies are valid.
     * @private
     * @type {string}
     */
    private _domain: string;
    /**
     * The expiration date for the cookies.
     * @private
     * @type {Date}
     */
    private _expires: Date;

    constructor() {
        const date = new Date();
        date.setFullYear(new Date().getFullYear() + 50);
        this._expires = date;
        this._domain = location.hostname;
    }
    /**
     * Gets the domain for which the cookies are valid.
     * @returns {string} The domain.
     */
    get domain(): string {
        return this._domain;
    }
    /**
     * Sets the domain for which the cookies are valid.
     * @param {string} value - The domain.
     */
    set domain(value: string) {
        this._domain = value;
    }
    /**
     * Gets the prefix used for cookie keys.
     * @returns {string} The cookie prefix.
     */
    get cookiePrefix(): string {
        return this._cookiePrefix;
    }
    /**
     * Sets the prefix used for cookie keys.
     * @param {string} value - The cookie prefix.
     */
    set cookiePrefix(value: string) {
        this._cookiePrefix = value;
    }
    /**
     * Gets the expiration date for the cookies.
     * @returns {Date} The expiration date.
     */
    get expires(): Date {
        return this._expires;
    }
    /**
     * Sets the expiration date for the cookies.
     * @param {Date} value - The expiration date.
     */
    set expires(value: Date) {
        this._expires = value;
    }
    /**
     * Retrieves all cookies that match the prefix as an object.
     * @returns {{ [key: string]: string }} An object containing the cookies.
     */
    public getCookie(): { [key: string]: string } {
        const cookieString = document.cookie;
        const cookies: { [key: string]: string } = {};

        cookieString.split('; ').forEach((cookie) => {
            const [key, value] = cookie.split('=');
            if (key && value && key.startsWith(this.cookiePrefix)) {
                cookies[key.slice(this.cookiePrefix.length)] =
                    decodeURIComponent(value);
            }
        });

        return cookies;
    }
    /**
     * Adds a cookie with a specified key and value.
     * @param {string} key - The key for the cookie.
     * @param {string} value - The value for the cookie.
     */
    public addCookie(key: string, value: string): void {
        document.cookie = `${this.cookiePrefix}${key}=${encodeURIComponent(value)}; Expires=${this.expires.toUTCString()}; Domain=${this.domain}; Path=/; SameSite=None; Secure;`;
    }
    /**
     * Removes a cookie with the specified key.
     * @param {string} key - The key for the cookie to be removed.
     */
    public removeCookie(key: string): void {
        document.cookie = `${this.cookiePrefix}${key}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=${this.domain}; path=/; SameSite=None; Secure;`;
    }
    /**
     * Clears all cookies that match the prefix.
     */
    public clearCookies(): void {
        const cookies = this.getCookie();

        Object.keys(cookies).forEach((key) => {
            this.removeCookie(key);
        });
    }
}

export default CookieManager;
