import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const calc = (
    arg1: number | string,
    arg2: number,
    operand: Action | string,
  ) => simpleCalculator({ a: arg1, b: arg2, action: operand });

  test('should add two numbers', () => {
    expect(calc(2, 3, Action.Add)).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(calc(2, 3, Action.Subtract)).toBe(-1);
  });

  test('should multiply two numbers', () => {
    expect(calc(2, 3, Action.Multiply)).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(calc(10, -2, Action.Divide)).toBe(-5);
  });

  test('should exponentiate two numbers', () => {
    expect(calc(2, 10, Action.Exponentiate)).toBe(1024);
  });

  test('should return null for invalid action', () => {
    expect(calc(2, 3, 'Nonsense')).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(calc('2', 3, Action.Multiply)).toBeNull();
  });
});
