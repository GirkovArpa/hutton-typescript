'use strict';

type char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | string;
const s: string = 'foo';
const [c]: char = s;
// [ERROR]: Type 'string' is not assignable to type 'char'.