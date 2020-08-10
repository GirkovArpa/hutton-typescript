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
  if (!pt.length) return ct;
  const [pwL] = pw;
  let shift = abc.indexOf(pwL);
  const [firstCharOfPerm] = perm;
  shift += abc.indexOf(firstCharOfPerm);
  shift += 2;
  const [ptL] = pt;
  let ctL_i = (shift + perm.indexOf(ptL)) % 26;
  let ctL = perm[ctL_i];
  let ptL_i = perm.indexOf(ptL);
  return encrypt(pt.slice(1), pw.slice(1), k, ct + ctL, swap(perm, ptL_i, ctL_i));
}