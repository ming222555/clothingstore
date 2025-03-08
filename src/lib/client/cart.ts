export async function addToCartApi(productId: string) {
  const res = await fetch("http://localhost:3000/api/cart-overlay", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ add: productId }),
    credentials: "include",
  });

  const data = await res.json();

  return data;
}
