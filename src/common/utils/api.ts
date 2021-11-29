type APIFuncType = (...arg: any[]) => Promise<unknown>;

type MappingAPIFuncType = () => ReturnType<APIFuncType>;

export const reviseSettledData = (promiseResults: PromiseSettledResult<unknown>[]) => {
  const results = promiseResults.map((data) => {
    if (data.status === 'fulfilled') {
      return data.value;
    }
    return null;
  });
  return results;
};

export const createPromise = (func: APIFuncType, ...args: unknown[]) => {
  return new Promise((res, rej) => {
    func(...args)
      .then((result) => res(result))
      .catch((err) => rej(err));
  });
};

export const resolveAsyncsInParallel = async (...args: MappingAPIFuncType[]) => {
  const APIs = args.map((func) => {
    return createPromise(func);
  });
  const promiseResults = await Promise.allSettled(APIs);
  const revisedResults = reviseSettledData(promiseResults);
  return revisedResults;
};
