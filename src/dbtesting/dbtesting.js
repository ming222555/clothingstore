const cart = {
  id: "cartid123",
  lines: [
    {
      product_id: "one-shoe",
      name: "One Shoe",
      unit_price: 2.0,
      qty: 10,
      img_src: "/img123.jpg",
    },
    {
      product_id: "kid-hat",
      name: "Kid hat",
      unit_price: 5.0,
      qty: 25,
      img_src: "/img123.jpg",
    },
  ],
  currency: "USD",
};

export function getCart() {
  return cart;
}

export function updateDb(productId, qty) {
  if (productId === "one-shoe") {
    cart.lines[0].qty = qty;
    return;
  }
  if (productId === "kid-hat") {
    cart.lines[1].qty = qty;
    return;
  }
}
