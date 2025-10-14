import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 81, b: 9, action: Action.Divide, expected: 9 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 9, b: 9, action: Action.Multiply, expected: 81 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 135, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: '1', b: 2, action: Action.Multiply, expected: null },
  { a: 135, b: '0', action: Action.Multiply, expected: null },
  { a: 2, b: 10, action: 'Hello', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should utilize correct calculations based on table testCases',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
