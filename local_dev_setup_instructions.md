
# Local Development Setup Instructions

In order to test and work on this project locally, you can run multiple localhost servers with different ports. Follow the steps below to configure domain masks for different localhost servers.

## Step 1: Configure Hosts File

Open the hosts file located at:

```
C:\Windows\System32\drivers\etc\hosts
```

Add the following lines to configure the subdomains:

```
127.0.0.1   sub1.parent.com
127.0.0.1   sub2.parent.com
127.0.0.1   sub3.parent.com
127.0.0.1   sub4.parent.com
```

## Step 2: Configure Local Development Server

Configure your localhost development server to use these host names. For example, in your Vite configuration, you can set it up like this:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 8080,
        https: {},
        host: 'sub1.parent.com'
    },
});
```

## Step 3: Running the Domains

Now you can run these domains and configure your subdomain library to use `.parent.com` as the parent domain.
