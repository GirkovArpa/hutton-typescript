# Hutton Cipher

The Hutton cipher of [EricBondHutton](https://old.reddit.com/user/ericbondhutton), written in TypeScript in a functional style.

## Usage

```javascript
import { encrypt } from 'https://deno.land/x/hutton/mod.ts';

console.log(
  encrypt('helloworld', 'foo', 'bar'); // 'pwckfenttc'
);
```