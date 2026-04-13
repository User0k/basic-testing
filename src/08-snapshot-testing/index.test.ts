import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const getNumbersArray = (n: number): number[] => {
    const a = [];
    for (let i = 1; i <= n; i++) {
      a.push(i);
    }
    return a;
  };

  const numberOfElements = 5;
  const elements = getNumbersArray(numberOfElements);
  const sameElements = getNumbersArray(numberOfElements);
  const otherElements = getNumbersArray(numberOfElements).concat(-1);

  const list = generateLinkedList(elements);
  const sameStructureList = generateLinkedList(sameElements);
  const otherStructureList = generateLinkedList(otherElements);

  test('should generate linked list from values 1', () => {
    expect(list).toStrictEqual(sameStructureList);
    expect(list).not.toStrictEqual(otherStructureList);
  });

  test('should generate linked list from values 2', () => {
    expect(list).toMatchSnapshot();
    expect(sameStructureList).toMatchSnapshot();
  });
});
