# subdomain-storage

subdomain-storage is an npm package designed to facilitate shared browser storage between subdomains of a parent domain. It provides a wrapper that mimics the localStorage or sessionStorage APIs but operates using cookies. This allows for seamless data sharing across subdomains, making it particularly useful for multi-app environments under a single parent domain.

## Features

- **Shared Storage Across Subdomains:** Share data between subdomains of a parent domain.
- **Storage Interface Implementation:** Implements the Storage interface, making it easy to use with existing code that relies on localStorage or sessionStorage.
- **Cookie-Based Storage:** Utilizes cookies for storing data, subject to cookie size limitations.

## Installation

```bash
npm install subdomain-storage
```

## Usage

```javascript
import subdomainStorage from 'subdomain-storage';

// Set configuration. Aplly this config on top level, before using storage
subdomainStorage.setConfig({
  domain: '.example.com',
  cookiePrefix: 'sds_',
  expireTime: new Date('2030-01-01')
});

// Set an item
subdomainStorage.setItem('key', 'value');

// Get an item
const value = subdomainStorage.getItem('key');

// Remove an item
subdomainStorage.removeItem('key');

// Clear all items
subdomainStorage.clear();

// Get the number of items in storage
const length = subdomainStorage.length;
```

## API Reference

### Properties

- `length`: Gets the number of items in the storage.

### Methods

- `getItem(key: string): string | null`: Gets the item associated with the specified key.
- `setItem(key: string, value: string): void`: Adds a new item to the storage.
- `removeItem(key: string): void`: Removes the item associated with the specified key.
- `clear(): void`: Clears all items from the storage.
- `setConfig(config: { domain: string, cookiePrefix?: string, expireTime?: Date }): void`: Sets the configuration for the storage. Accepts an object with the following properties:
  - `domain`: A parent domain that will allow sharing data between its subdomains. (type: string)
  - `cookiePrefix`: A prefix to add to cookie keys to prevent name collisions. Default value is 'sds_'. (type: string)
  - `expireTime`: The expiration time for the cookies. Default is a long duration. (type: Date)

## License

This project is licensed under the MIT License.