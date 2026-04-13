import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mockBaseURL = 'https://jsonplaceholder.typicode.com';
  const mockRelativePath = '/albums/1';
  const mockData = { userId: 1, id: 1, title: 'Lorem ipsum' };
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({ data: mockData });
    jest.spyOn(axios, 'create').mockReturnValue({
      get: mockGet,
    } as unknown as AxiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(mockRelativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: mockBaseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(mockRelativePath);
    expect(mockGet).toHaveBeenCalledWith(mockRelativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(mockRelativePath);
    expect(data).toEqual(mockData);
  });
});
