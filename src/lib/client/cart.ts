export async function addToCartApi(product_id: string) {
  const res = await fetch("http://localhost:3000/api/cart-overlay", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ add: product_id }),
    credentials: "include",
  });
  console.log("addToCartApi res.ok", res.ok);
  const data = await res.json();
  console.log("addToCartApi res.json data", data);
  return data;
}
