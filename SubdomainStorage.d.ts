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
declare class SubdomainStorage implements Storage {
    [name: string]: any;
    private _length;
    private cookieStorage;
    private addedKeys;
    constructor();
    /**
     * Gets the number of items in the storage.
     * @returns {number} The number of items.
     */
    get length(): number;
    /**
     * Clears all items from the storage.
     */
    clear(): void;
    /**
     * Gets the item associated with the specified key.
     * @param {string} key - The key of the item to retrieve.
     * @returns {string | null} The item value or null if not found.
     */
    getItem(key: string): string | null;
    /**
     * Adds a new item to the storage.
     * @param {string} key - The key of the item to add.
     * @param {string} value - The value of the item to add.
     */
    setItem(key: string, value: string): void;
    /**
     * Removes the item associated with the specified key.
     * @param {string} key - The key of the item to remove.
     */
    removeItem(key: string): void;
    /**
     * !!! Not implemented !!!
     */
    key(index: number): string | null;
    /**
     * Sets the configuration for the storage.
     * @param {StorageConfig} config - The configuration options.
     */
    setConfig(config: StorageConfig): void;
    private restoreState;
}
declare const _default: SubdomainStorage;
export default _default;
