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

/*
  calculate progress in percentage
*/
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
  const val = ((now - start) * 100) / (end - start)
  return Math.max(0, Math.round(val));
}

/*
  scale up a value from percentage
*/
export const scaleUp = (params: { max_val: number, min_val: number, a: number}) => {

  const sol = ((params.max_val - params.min_val) * params.a) / 100

  return sol + params.min_val
}

/*
  currency to symbol
*/

export const currencyToSymbol = (currency: "USD" | "NGN"): string => {
  if(currency == "NGN") {
    return  '₦'
  }

  if(currency == "USD") {
    return  '$'
  }

  return ''
}