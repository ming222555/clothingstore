export const safeJsonParse = (str: string): unknown => {
  try {
    return JSON.parse(str); // if ok, returns a json but whose shape unknown
  } catch {
    return null;
  }
};
