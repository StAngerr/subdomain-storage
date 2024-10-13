import { CookieAttributes } from './CookieManager';
/**
 * Converts a given value to a string representation.
 *
 * This function checks if the value has a `toString` method and uses it if available.
 * If the value doesn't have a `toString` method, it falls back to using `JSON.stringify`.
 *
 * @param {unknown} v - The value to be converted to a string. This can be of any type.
 * @returns {string} The string representation of the input value.
 */
export declare const convertValueToString: (v: unknown) => string;
/**
 * Checks if a value is null or undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is null or undefined, false otherwise.
 */
export declare const isNil: (value: unknown) => boolean;
/**
 * Converts a configuration object to a cookie string.
 *
 * This function iterates over the key-value pairs of the configuration object and constructs
 * a string suitable for setting cookies. Boolean values are included as directives if true,
 * and other non-nil values are included as key-value pairs.
 *
 * @param {CookieAttributes} config - The configuration object containing cookie attributes.
 * @returns {string} The cookie string representation of the configuration object.
 */
export declare const configToCookieString: (config: CookieAttributes) => string;
