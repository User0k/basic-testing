import path from 'path';
import fs from 'fs';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const cb = jest.fn();
    const spy = jest.spyOn(globalThis, 'setTimeout');

    doStuffByTimeout(cb, timeout);
    expect(spy).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const cb = jest.fn();
    jest.spyOn(globalThis, 'setTimeout');

    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const cb = jest.fn();
    const spy = jest.spyOn(globalThis, 'setInterval');

    doStuffByInterval(cb, interval);
    expect(spy).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const times = 7;
    const cb = jest.fn();
    jest.spyOn(globalThis, 'setInterval');

    doStuffByInterval(cb, interval);
    expect(cb).not.toHaveBeenCalled();

    for (let i = 0; i < times; i++) {
      jest.advanceTimersByTime(interval);
    }

    expect(cb).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'non.existed';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'Hello, World!';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously('/file.txt');

    expect(fs.promises.readFile).toHaveBeenCalled();
    expect(result).toBe(mockContent);
  });
});
