export const sleep = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retryUntilSuccessfull = async <R = unknown>(
  callback: () => Promise<R>,
  retries = 5,
  interval = 500,
): Promise<R> => {
  try {
    return await callback();
  } catch (err) {
    if (retries > 0) {
      await sleep(interval);
      return retryUntilSuccessfull(callback, retries - 1, interval);
    } else {
      throw err;
    }
  }
};
