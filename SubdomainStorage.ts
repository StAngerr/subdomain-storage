import CookieManager from './CookieManager';
import { convertValueToString } from './utils';

/**
 * Configuration options for the SubdomainStorage.
 */
export interface StorageConfig {
    domain: string;
    cookiePrefix?: string;
    expireTime?: Date;
}

/**
 * A class to manage storage using cookies within a specific subdomain.
 * Implements the Storage interface.
 */
class SubdomainStorage implements Storage {
    [name: string]: any;

    private _length: number = 0;
    private cookieStorage: CookieManager;
    private addedKeys: string[] = [];

    constructor() {
        const newStorage = new CookieManager();
        const stored = newStorage.getCookie();

        this.restoreState(stored);
        this.cookieStorage = newStorage;
    }

    /**
     * Gets the number of items in the storage.
     * @returns {number} The number of items.
     */
    get length(): number {
        return this._length;
    }

    /**
     * Clears all items from the storage.
     */
    clear(): void {
        for (let i = 0; i < this.addedKeys.length; i++) {
            const key = this.addedKeys[i];
            if (this.hasOwnProperty(key) && key !== 'length') {
                delete this[key];
            }
        }
        this._length = 0;
        this.addedKeys = [];
        this.cookieStorage.clearCookies();
    }

    /**
     * Gets the item associated with the specified key.
     * @param {string} key - The key of the item to retrieve.
     * @returns {string | null} The item value or null if not found.
     */
    getItem(key: string): string | null {
        return this.hasOwnProperty(key) && this.addedKeys.includes(key)
            ? this[key]
            : null;
    }

    /**
     * Adds a new item to the storage.
     * @param {string} key - The key of the item to add.
     * @param {string} value - The value of the item to add.
     */
    setItem(key: string, value: string): void {
        if (!key)
            throw new Error("Can't call setItem without key as first argument");

        const valueAsString =
            typeof value === 'string' ? value : convertValueToString(value);
        this._length++;
        this[key] = valueAsString;
        this.addedKeys.push(key);
        this.cookieStorage.addCookie(key, valueAsString);
    }

    /**
     * Removes the item associated with the specified key.
     * @param {string} key - The key of the item to remove.
     */
    removeItem(key: string): void {
        if (this.hasOwnProperty(key)) {
            delete this[key];
            this._length--;
            this.cookieStorage.removeCookie(key);
        }
    }

    /**
     * !!! Not implemented !!!
     */
    key(index: number): string | null {
        return null;
    }

    /**
     * Sets the configuration for the storage.
     * @param {StorageConfig} config - The configuration options.
     */
    setConfig(config: StorageConfig) {
        if (config.cookiePrefix) {
            this.clear();
            this.cookieStorage.cookiePrefix = config.cookiePrefix;
            this.restoreState(this.cookieStorage.getCookie());
        }
        if (config.domain) {
            this.cookieStorage.domain = config.domain;
        }
        if (config.expireTime) {
            this.cookieStorage.expires = config.expireTime;
        }
    }

    /**
     * Syncs current instance with storage
     */
    sync() {
        const stored = this.cookieStorage.getCookie();

        for (const key in stored) {
            if (!this.hasOwnProperty(key)) {
                this.addedKeys.push(key);
                this._length++;
                this[key] = stored[key];
            }
        }
    }

    private restoreState(currentCookies: { [key: string]: string }) {
        Object.entries(currentCookies).forEach(
            ([key, value]) => (this[key] = value),
        );
        const keys = Object.keys(currentCookies);
        this._length = keys.length;
        this.addedKeys = keys;
    }
}

export default new SubdomainStorage();
