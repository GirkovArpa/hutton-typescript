'use strict';

import { assertEquals } from 'https://deno.land/std@0.64.0/testing/asserts.ts';
import { encrypt, decrypt, permutate, swap, rotate, mod } from './main.ts';

Deno.test('mod', () => {
  assertEquals(mod(-13, 64), 51);
});

Deno.test('rotate', () => {
  assertEquals(rotate('foo'), 'oof');
});

Deno.test('swap', () => {
  assertEquals(swap('barcdefghijklmnopqstuvwxyz', 8, 16), 'barcdefgpijklmnohqstuvwxyz');
});

Deno.test('permutate', () => {
  assertEquals(permutate('bar'), 'barcdefghijklmnopqstuvwxyz');
});

Deno.test('encrypt', () => {
  assertEquals(encrypt('helloworld', 'foo', 'bar'), 'pwckfenttc');
});

Deno.test('decrypt', () => {
  assertEquals(decrypt('pwckfenttc', 'foo', 'bar'), 'helloworld');
});