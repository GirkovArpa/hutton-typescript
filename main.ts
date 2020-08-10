'use strict';

const abc = 'abcdefghijklmnopqrstuvwxyz';

export const swap = (s: string, i: number, j: number): string => {
  let a: string[] = [...s];
  [a[i], a[j]] = [a[j], a[i]];
  const swapped = a.join('');
  return swapped;
}

const emptyStringIfInSet = (set: Set<string>) => (char: string) => set.has(char) ? '' : char;
const allLowerCaseChars = /[a-z]/g;

export const permutate = (key: string): string => {
  const set: Set<string> = new Set(key);
  const uniques: string = [...set].join('');
  const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  const difference: string = alphabet.replace(allLowerCaseChars, emptyStringIfInSet(set));
  const permutation: string = uniques.concat(difference);
  return permutation;
}

export const encrypt = (pt: string, pw: string, k: string, ct: string = '', perm: string = permutate(k)): string => {
  const [pwL] = pw;
  const pwL_i = abc.indexOf(pwL);
  const [permL] = perm;
  const permL_i = abc.indexOf(permL);
  const shift = (pwL_i + permL_i + 2);
  const [ptL] = pt;
  const ctL_i = (shift + perm.indexOf(ptL)) % 26;
  const ctL = perm[ctL_i];
  const ptL_i = perm.indexOf(ptL);

  const ptSlice = pt.slice(1);
  const pwSlice = pw.slice(1);
  const ctNew = ct.concat(ctL);
  const permSwapped = swap(perm, ptL_i, ctL_i);
  
  return (pt.length === 0) ? ct : encrypt(ptSlice, pwSlice, k, ctNew, permSwapped);
}