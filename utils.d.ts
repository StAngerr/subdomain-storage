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
