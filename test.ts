'use strict';

import { assertEquals } from 'https://deno.land/std@0.64.0/testing/asserts.ts';
import { encrypt, permutateAlphabet, swap } from './main.ts';

Deno.test('swap', () => {
  assertEquals(swap('barcdefghijklmnopqstuvwxyz', 8, 16), 'barcdefgpijklmnohqstuvwxyz');
});

Deno.test('permutate', () => {
  assertEquals(permutateAlphabet('bar'), 'barcdefghijklmnopqstuvwxyz');
});

Deno.test('encrypt', () => {
  assertEquals(encrypt('helloworld', 'foo'.repeat(100), 'bar'), 'pwckfenttc');
});