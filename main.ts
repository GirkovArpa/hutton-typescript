'use strict';

type char = string;

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';
const ALL_LOWER_CASE: RegExp = /[a-z]/g;
const ENTIRELY_LOWER_CASE: RegExp = /^[a-z]*$/;

export const validate = (...args: string[]): void => {
  args.forEach((s: string) => {
    if (!ENTIRELY_LOWER_CASE.test(s)) throw new Error(`String must consist of lowercase letters only. Received ${JSON.stringify(s)}.`);
  });
}

export const mod = (n: number, m: number): number => ((n % m) + m) % m;

export const rotate = (s: string): string => {
  const [c]: char = s;
  const sliced: string = s.slice(1);
  const rotated: string = sliced.concat(c);
  return rotated;
}

export const swap = (s: string, i: number, j: number): string => {
  let a: string[] = [...s];
  [a[i], a[j]] = [a[j], a[i]];
  const swapped: string = a.join('');
  return swapped;
}

const emptyIfIn = (set: Set<char>) => (c: char): string => set.has(c) ? '' : c;

export const permutate = (key: string): string => {
  const set: Set<char> = new Set(key);
  const uniques: string = [...set].join('');
  const diff: string = ALPHABET.replace(ALL_LOWER_CASE, emptyIfIn(set));
  const perm: string = uniques.concat(diff);
  return perm;
}

export const encrypt = (pt: string, pw: string, k: string, ct: string = '', perm: string = permutate(k)): string => {
  validate(pt, pw, k, ct, perm);
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

export const decrypt = (ct: string, pw: string, k: string, pt: string = '', perm: string = permutate(k)): string => {
  validate(pt, pw, k, ct, perm);
  const [pwC]: char = pw; 
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const [permC]: char = perm;
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = -(pwC_i + permC_i + 2);
  const [ctC]: char = ct;
  const ptC_i: number = mod((shift + perm.indexOf(ctC)), ALPHABET.length);
  const ptC: char = perm[ptC_i];
  const ctC_i: number = perm.indexOf(ctC);

  const ctSlice: string = ct.slice(1);
  const pwRotated: string = rotate(pw);
  const ptNew: string = pt.concat(ptC);
  const permSwapped: string = swap(perm, ctC_i, ptC_i);

  return (ct.length === 0) ? pt : decrypt(ctSlice, pwRotated, k, ptNew, permSwapped);
}
