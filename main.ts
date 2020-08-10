'use strict';

import { getPermutation } from './getPermutation.ts';


export const encrypt = (pt: string, pw: string, k: string, perm: string[] = [...getPermutation(k)] ): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetKeyedConstant = perm.join('').toUpperCase();
  let output = '';
  for (let i = 0; i < pt.length; i++) {
    let shift = alphabet.indexOf(pw[i % pw.length]);
    shift += alphabet.indexOf(perm[0]);
    shift += 2;
    const ptL = pt[i];
    let ctL_i = (shift + perm.indexOf(ptL)) % alphabet.length;
    let ctL = perm[ctL_i];
    output += ctL;
    let ptL_i = perm.indexOf(ptL);
    [perm[ctL_i], perm[ptL_i]] = [perm[ptL_i], perm[ctL_i]];
  }
  return output;
}