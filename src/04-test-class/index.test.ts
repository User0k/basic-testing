import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account).toBeInstanceOf(BankAccount);
    expect(account).toHaveProperty('getBalance');
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1050)).toThrow(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(1050, account)).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    expect(account).toHaveProperty('deposit');

    account.deposit(1000);
    expect(account.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    expect(account).toHaveProperty('withdraw');

    account.withdraw(100);
    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    expect(account).toHaveProperty('transfer');

    const account2 = getBankAccount(500);
    account.transfer(200, account2);
    expect(account.getBalance()).toBe(800);
    expect(account2.getBalance()).toBe(700);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    expect(account).toHaveProperty('fetchBalance');

    const balance = await account.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    const spy = jest.spyOn(account, 'fetchBalance');
    spy.mockResolvedValue(21);

    await account.synchronizeBalance();

    expect(spy).toHaveBeenCalled();
    expect(account.getBalance()).toBe(21);
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    const spy = jest.spyOn(account, 'fetchBalance');
    spy.mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(spy).toHaveBeenCalled();
  });
});
