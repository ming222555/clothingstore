import * as Db from "@/lib/db";

export type Cart = {
  id: string;
  lines: {
    product_id: string;
    qty: number;
    name: string;
    unit_price: number;
    img_src: string;
    line_total: number;
  }[];
  currency: string;
};

export type Product = Db.DbProduct;
export type DbShippingRate = Db.DbShippingRate;

export type Checkout = {
  // id: string;
  cust_email: string;
  cust_shipping_fullname: string;
  cust_shipping_address: string;
  cust_shipping_postalcode: string;
  cust_shipping_city: string;
  cust_shipping_state: string;
  cust_shipping_country: string;
  shipping_rate_id: string;
  cust_billing_fullname: string;
  cust_billing_address: string;
  cust_billing_postalcode: string;
  cust_billing_city: string;
  cust_billing_state: string;
  cust_billing_country: string;
  cust_billing_phone: string;
  // cust_credit_card_nbr: string;
  // cust_card_expiration_date: string;
  // cust_card_cvc: string;
};

export const cartGet = async (cartId: string): Promise<Cart | null> => {
  // Retrieve cart from db with cartId

  if (!cartId) {
    return null;
  }

  if (typeof cartId !== "string") {
    return null;
  }

  const cart = await Db.cartGet(cartId);

  return cart;
};

export const checkoutGet = async (cartId: string): Promise<Checkout | null> => {
  // Retrieve checkout from db with cartId

  if (!cartId) {
    return null;
  }

  if (typeof cartId !== "string") {
    return null;
  }

  const checkout = await Db.checkoutGet(cartId);

  return checkout;
};

export const calculateCartTotalNetWithoutShipping = async (
  cart: Cart
): Promise<number> => {
  if (!cart) {
    return 0;
  }

  const total = await Db.cartTotalNetWithoutShipping(cart);

  return total;
};

export const getCartShippingRate = async (
  cart: Cart
): Promise<Db.DbShippingRate | null> => {
  if (!cart) {
    return null;
  }

  const sr = await Db.cartShippingRate(cart);

  return sr;
};

export const cartAdd = async ({
  productId,
  cartId,
}: {
  productId: string;
  cartId: string;
}): Promise<Db.CartAddReturn> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID", meta: null };
  }

  const ret = await Db.cartAdd({
    productId,
    cartId,
  });
  return ret;
};

export const cartUpdate = async ({
  qty,
  productId,
  cartId,
}: {
  qty: number;
  productId: string;
  cartId: string;
}): Promise<Db.CartAddReturn> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID", meta: null };
  }

  const ret = await Db.cartUpdate({
    qty,
    productId,
    cartId,
  });
  return ret;
};

export const checkoutUpdateOrInsertShippingRateId = async ({
  shippingRateId,
  cartId,
}: {
  shippingRateId: string;
  cartId: string;
}): Promise<{ error: string }> => {
  if (!shippingRateId || typeof shippingRateId !== "string") {
    return { error: "Invalid shipping rate id" };
  }

  const ret = await Db.checkoutUpdateOrInsertShippingRateId({
    shippingRateId,
    cartId,
  });
  return ret;
};

export const checkoutUpdateOrInsert = async ({
  formValues,
  cartId,
}: {
  formValues: Checkout;
  cartId: string;
}): Promise<{
  errors: {
    field: string;
    errormsg: string;
  }[];
}> => {
  const ret = await Db.checkoutUpdateOrInsert({
    checkout: formValues,
    cartId,
  });
  return ret;
};

export const insertPayment = async ({
  total,
  nonce,
  cartId,
}: {
  total: number;
  nonce: string;
  cartId: string;
}): Promise<{
  error: string;
}> => {
  const ret = await Db.insertPayment({
    total,
    nonce,
    cartId,
  });
  return ret;
};

export const getShippingRates = async () => {
  const rc = await Db.getShippingRates();
  return rc;
};

export const validateCheckout = async (formValues: Checkout) => {
  const rc = await Db.validateCheckout(formValues);
  return rc;
};

export async function getProduct(productId: string) {
  const product = await Db.getProduct(productId);
  return product;
}

export async function getProductsSimilar(productId: string) {
  const products = await Db.getProductsSimilar(productId);
  return products;
}

export const getProductsAll = async () => {
  const products = await Db.getProductsAll();
  return products;
};

export const getProductsCategory = async (category: string) => {
  const products = await Db.getProductsCategory(category);
  return products;
};

export const getCategory = async (id: string) => {
  const category = await Db.getCategory(id);
  return category;
};

export const getProductForHtmlHead = async (id: string) => {
  const product = await Db.getProductForHtmlHead(id);
  return product;
};
