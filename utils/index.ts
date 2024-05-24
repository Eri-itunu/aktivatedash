export const promisify = (fn: any) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

export const calcProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()

  if (now < start) {
    return 0
  }

  if (now > end) {
    return 100
  }
  const val = (now * 100) / (end - start)
  return Math.max(0, Math.round(val));
}