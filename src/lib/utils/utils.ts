export const safeJsonParse = (str: string): unknown => {
  try {
    return JSON.parse(str); // if ok, returns a json but whose shape unknown
  } catch {
    return null;
  }
};

export const formatMoney = (
  amount: number,
  currency: string,
  locale = "en-US"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
