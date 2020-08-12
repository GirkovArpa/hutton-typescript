/** This module is browser compatible. */

'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALL_LOWER_CASE = /[a-z]/g;
const ENTIRELY_LOWER_CASE = /^[a-z]*$/;

/** Throw an error if any string argument is not a lower-case ASCII letter string. */
export function validate(...args: string[]): void {
  args.forEach((s: string) => {
    if (!ENTIRELY_LOWER_CASE.test(s))
      throw new Error(`String must consist of lowercase letters only. Received ${JSON.stringify(s)}.`);
  });
}

/** Alternative to `%` that works on negative numbers. */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/** Shift each character in a string to the right, wrapping around. */
export function rotate(s: string): string {
  const [c]: string = s;
  const sliced: string = s.slice(1);
  const rotated: string = sliced.concat(c);
  return rotated;
}

/** Swap a pair of characters in a string. */
export function swap(s: string, i: number, j: number): string {
  let a: string[] = [...s];
  [a[i], a[j]] = [a[j], a[i]];
  const swapped: string = a.join('');
  return swapped;
}

/** Returns a closure which returns an empty string if the given `Set` contains the given `string`. */
function nothingIfIn(set: Set<string>) {
  return (c: string): string => set.has(c) ? '' : c;
}

/** Returns the alphabet with all `key` letters moved to the beginning. */
export function permutate(key: string): string {
  const set: Set<string> = new Set(key);
  const uniques: string = [...set].join('');
  const diff: string = ALPHABET.replace(ALL_LOWER_CASE, nothingIfIn(set));
  const perm: string = uniques.concat(diff);
  return perm;
}

/** Encrypts a string using the provided password and key, all of which must consist of characters in the range `[a-z]`.
 *
 *      const ciphertext = encrypt('helloworld', 'foo', 'bar');
 */
export function encrypt(pt: string, pw: string, k: string, ct = '', perm: string = permutate(k)): string {
  validate(pt, pw, k, ct, perm);
  const [pwC]: string = pw;
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const [permC]: string = perm;
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = (pwC_i + permC_i + 2);
  const [ptC]: string = pt;
  const ctC_i: number = (shift + perm.indexOf(ptC)) % ALPHABET.length;
  const ctC: string = perm[ctC_i];
  const ptC_i: number = perm.indexOf(ptC);

  const ptSlice: string = pt.slice(1);
  const pwRotated: string = rotate(pw);
  const ctNew: string = ct.concat(ctC);
  const permSwapped: string = swap(perm, ptC_i, ctC_i);

  return (pt.length === 0) ? ct : encrypt(ptSlice, pwRotated, k, ctNew, permSwapped);
}

/** Decrypts a string consisting only of characters in the range `[a-z]`. */
export function decrypt(ct: string, pw: string, k: string, pt = '', perm: string = permutate(k)): string {
  validate(pt, pw, k, ct, perm);
  const [pwC]: string = pw;
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const [permC]: string = perm;
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = -(pwC_i + permC_i + 2);
  const [ctC]: string = ct;
  const ptC_i: number = mod((shift + perm.indexOf(ctC)), ALPHABET.length);
  const ptC: string = perm[ptC_i];
  const ctC_i: number = perm.indexOf(ctC);

  const ctSlice: string = ct.slice(1);
  const pwRotated: string = rotate(pw);
  const ptNew: string = pt.concat(ptC);
  const permSwapped: string = swap(perm, ctC_i, ptC_i);

  return (ct.length === 0) ? pt : decrypt(ctSlice, pwRotated, k, ptNew, permSwapped);
}
