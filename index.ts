'use strict';

type char = string & {
  __value__: never // this is the phantom type
};

// This is a type guard function which can be used to assert that a string
// is of type char<Min,Max>
const isStringOfLength = (str: string): str is char => str.length <= 1;

// type constructor function
export const char = (input: unknown): char => {
  if (typeof input !== "string") {
    throw new Error("invalid input");
  }

  if (!isStringOfLength(input)) {
    throw new Error("input is not between specified min and max");
  }

  return input; // the type of input here is now StringOfLength<Min,Max>
};

// Now we can use our type constructor function
const myString = char('a') // myString has type StringOfLength<1,10>

const string: string = 'helloworld';
const [Char]: char = string;