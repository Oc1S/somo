export const safeJSONParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e);
    return str;
  }
};

export const getTypeString = (val: unknown) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

export const isString = (val: unknown): val is string => getTypeString(val) === 'String';
export const isFunction = (val: unknown): val is Function => getTypeString(val) === 'Function';
export const isObject = (val: unknown): val is Record<string, any> =>
  getTypeString(val) === 'Object';
