'use strict';

import { getPermutation } from './getPermutation.ts';

export const encrypt = (inp: string, pw: string, key: string): string => {
  let password = pw.repeat(Math.ceil(inp.replace(/[^A-Za-z]/g, '').length / pw.length)).split('');
  let input = inp.toString().split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let alphabetKeyed = getPermutation(key);
  const alphabetKeyedConstant = alphabetKeyed.join('').toUpperCase();
  let output = '';
  for (let i = 0; i < input.length; i++) {
    let shift = alphabet.indexOf(password[i]) + 1;
    shift += alphabet.indexOf(alphabetKeyed[0]) + 1;
    let outputLetterIndex = (shift + alphabetKeyed.indexOf(input[i])) % alphabet.length;
    let outputLetter = alphabetKeyed[outputLetterIndex];
    output += outputLetter;
    let alphabetKeyedIndex = alphabetKeyed.indexOf(input[i]);
    [alphabetKeyed[outputLetterIndex], alphabetKeyed[alphabetKeyedIndex]] = [alphabetKeyed[alphabetKeyedIndex], alphabetKeyed[outputLetterIndex]];
  }
  return output;
}

console.log(encrypt('helloworld', 'foo', 'bar'));