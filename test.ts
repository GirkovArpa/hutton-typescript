'use strict';

import { assertEquals } from 'https://deno.land/std@0.64.0/testing/asserts.ts';
import { getPermutation } from './getPermutation.ts';

Deno.test('getPermutation', () => {
  assertEquals(getPermutation('bar'), 'barcdefghijklmnopqstuvwxyz');
});
/*
Deno.test('encrypt', () => {
  assertEquals(encrypt('helloworld', 'foo', 'bar'), 'pwckfenttc');
});*/