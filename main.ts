'use strict';

type char = string;

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

export const rotate = (s: string): string => {
  const [c]: char = s;
  const sliced: string = s.slice(1);
  const rotated: string  = sliced.concat(c);
  return rotated;
}

export const swap = (s: string, i: number, j: number): string => {
  let a: string[] = [...s];
  [a[i], a[j]] = [a[j], a[i]];
  const swapped: string = a.join('');
  return swapped;
}

const emptyStringIfInSet = (set: Set<char>) => (c: char): string => set.has(c) ? '' : c;
const allLowerCaseChars: RegExp = /[a-z]/g;

export const permutateAlphabet = (key: string): string => {
  const set: Set<char> = new Set(key);
  const uniques: string = [...set].join('');
  const diff: string = ALPHABET.replace(allLowerCaseChars, emptyStringIfInSet(set));
  const perm: string = uniques.concat(diff);
  return perm;
}

export const encrypt = (pt: string, pw: string, k: string, ct: string = '', perm: string = permutateAlphabet(k)): string => {
  const [pwC]: char = pw;
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const [permC]: char = perm;
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = (pwC_i + permC_i + 2);
  const [ptC]: char = pt;
  const ctC_i: number = (shift + perm.indexOf(ptC)) % ALPHABET.length;
  const ctC: char = perm[ctC_i];
  const ptC_i: number = perm.indexOf(ptC);

  const ptSlice: string = pt.slice(1);
  const pwRotated: string = rotate(pw);
  const ctNew: string = ct.concat(ctC);
  const permSwapped: string = swap(perm, ptC_i, ctC_i);

  return (pt.length === 0) ? ct : encrypt(ptSlice, pwRotated, k, ctNew, permSwapped);
}