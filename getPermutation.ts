'use strict';

export const getPermutation = (key: string): string => {
  const set: Set<string> = new Set(key);
  const uniques: string = [...set].join('');
  const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  const difference: string = alphabet.replace(/[a-z]/g, (char: string) => set.has(char) ? '' : char);
  const permutation: string = uniques.concat(difference);
  return permutation;
}