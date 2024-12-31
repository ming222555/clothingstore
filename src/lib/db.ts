import sql from "better-sqlite3";

import type { Cart, CartDetailed } from "@/lib/commerce-kit";

const db = new sql("cart.db");

const DEFAULT_CURRENCY = "USD";
const DEFAULT_QTY_TO_ADD_TO_CART = 1;

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY, 
      currency TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS product (
      id TEXT PRIMARY KEY, 
      name TEXT,
      unit_price REAL,
      imgSrc TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_line (
      cart_id TEXT, 
      product_id TEXT, 
      qty INTEGER, 
      PRIMARY KEY(cart_id, product_id),
      FOREIGN KEY(cart_id) REFERENCES cart(id) ON DELETE CASCADE, 
      FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
    )`);

  // Creating products
  let stmt = db.prepare("SELECT COUNT(*) AS count FROM product");

  if (stmt.get().count === 0) {
    db.exec(`
    INSERT INTO product (id, name, unit_price, imgSrc)
    VALUES ('gloves-with-holes', 'Gloves with holes', 6.99, '/img-glove.jpg')
  `);

    db.exec(`
    INSERT INTO product (id, name, unit_price, imgSrc)
    VALUES ('arctic-circle-neck-warmer', 'Arctic Circle Neck Warmer', 16.99, '/img-arctic.jpg')
  `);

    db.exec(`
    INSERT INTO product (id, name, unit_price, imgSrc)
    VALUES ('sunbeam-tote-ray-tomasz', 'Sunbeam Tote Ray Tomasz', 25.00, '/img-tomasz.jpg')
  `);
  }

  // Creating dummy cart if not exist already
  // and its corresponding cart_line
  stmt = db.prepare("SELECT COUNT(*) AS count FROM cart");

  if (stmt.get().count === 0) {
    db.exec(`
    INSERT INTO cart (id, currency)
    VALUES ('pi_123', 'USD')
  `);
  }

  stmt = db.prepare("SELECT COUNT(*) AS count FROM cart_line");

  if (stmt.get().count === 0) {
    db.exec(`
      INSERT INTO cart_line (cart_id, product_id, qty)
      VALUES ('pi_123', 'gloves-with-holes', 6)
    `);

    db.exec(`
      INSERT INTO cart_line (cart_id, product_id, qty)
      VALUES ('pi_123', 'arctic-circle-neck-warmer', 7)
    `);

    db.exec(`
      INSERT INTO cart_line (cart_id, product_id, qty)
      VALUES ('pi_123', 'sunbeam-tote-ray-tomasz', 20)
    `);
  }
}

initDb();

export async function getCart(id: string): Promise<Cart | null> {
  // const stmt = db.prepare(`
  //   SELECT c.id, c.currency, cl.product_id, cl.qty
  //   FROM cart AS c
  //   INNER JOIN cart_line AS cl
  //   ON c.id = cl.cart_id
  //   INNER JOIN product AS p
  //   ON cl.product_id = p.id
  //   WHERE c.id = ?`);

  const stmt = db.prepare(`
    SELECT c.id, c.currency, cl.product_id, cl.qty
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ?`);

  // Sample result sets
  //
  // [
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "arctic-circle-neck-warmer",
  //       "qty": 7
  //   },
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "gloves-with-holes",
  //       "qty": 6
  //   }
  // ]
  //
  // cart table non empty but cart_line table empty.
  // [ { id: 'pi_123', currency: 'USD', product_id: null, qty: null } ]
  //
  // cart table empty
  // []

  // return stmt.all(id);

  const resultset = stmt.all(id);

  if (resultset.length === 0) {
    return null;
  }

  if (resultset.length === 1) {
    if (resultset[0].product_id === null) {
      return {
        id,
        lines: [],
        currency: "",
      };
    }
  }

  const cart_id = resultset[0].id;
  const currency = resultset[0].currency;

  return {
    id: cart_id,
    lines: resultset,
    currency,
  };
}

export async function cartTotalNetWithoutShipping(
  cart: Cart | CartDetailed
): Promise<number> {
  // const stmt = db.prepare(`
  //   SELECT c.id, c.currency, cl.product_id, cl.qty
  //   FROM cart AS c
  //   INNER JOIN cart_line AS cl
  //   ON c.id = cl.cart_id
  //   INNER JOIN product AS p
  //   ON cl.product_id = p.id
  //   WHERE c.id = ?`);

  const cart_lines = cart.lines;
  const placeholders = cart_lines.map(() => "?").join(",");

  const products = cart_lines.map((line) => `${line.product_id}`);

  const cart_id = cart.id;

  const stmt = db.prepare(`
    SELECT SUM( cl.qty * p.unit_price) AS cart_total
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ? AND p.id IN (${placeholders})`);

  // Sample result sets
  //
  // [
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "arctic-circle-neck-warmer",
  //       "qty": 7
  //   },
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "gloves-with-holes",
  //       "qty": 6
  //   }
  // ]
  //
  // cart table non empty but cart_line table empty.
  // [ { id: 'pi_123', currency: 'USD', product_id: null, qty: null } ]
  //
  // cart table empty
  // []

  // return stmt.all(id);

  const resultset = stmt.all(cart_id, ...products);

  if (resultset.length === 0) {
    return 0;
  }

  const cart_total = resultset[0].cart_total;

  if (cart_total === null) {
    return 0;
  }
  return cart_total;
}

export async function getCartWithDetails(
  cart: Cart
): Promise<CartDetailed | null> {
  const cart_lines = cart.lines;
  const placeholders = cart_lines.map(() => "?").join(",");

  const products = cart_lines.map((line) => `${line.product_id}`);

  const cart_id = cart.id;

  const stmt = db.prepare(`
    SELECT c.id, c.currency, cl.product_id, cl.qty, p.name, p.unit_price, p.imgSrc
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ? AND p.id IN (${placeholders})`);

  // Sample result sets
  //
  // [
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "arctic-circle-neck-warmer",
  //       "qty": 7
  //   },
  //   {
  //       "id": "pi_123",
  //       "currency": "USD",
  //       "product_id": "gloves-with-holes",
  //       "qty": 6
  //   }
  // ]
  //
  // cart table non empty but cart_line table empty.
  // [ { id: 'pi_123', currency: 'USD', product_id: null, qty: null } ]
  //
  // cart table empty
  // []

  // return stmt.all(id);

  const resultset = stmt.all(cart_id, ...products);

  if (resultset.length === 0) {
    return null;
  }

  const id = resultset[0].id;
  const currency = resultset[0].currency;

  if (resultset.length === 1) {
    if (resultset[0].product_id === null) {
      return {
        id,
        lines: [],
        currency: "",
      };
    }
  }

  return {
    id: id,
    lines: resultset,
    currency,
  };
}

async function getNewCartWithProductLineToAdd(
  product_id: string
): Promise<CartDetailed | null> {
  const stmt = db.prepare(`
    SELECT product_id, ${DEFAULT_QTY_TO_ADD_TO_CART} AS qty, name, unit_price, imgSrc
    FROM product
    WHERE id = ?`);

  const resultset = stmt.all(product_id);

  // no such product in db
  if (resultset.length === 0) {
    return null;
  }

  const newCartline = resultset[0];

  const newCart = {
    id: "",
    lines: newCartline,
    currency: DEFAULT_CURRENCY,
  };

  return newCart;
}

export const getPreviewCartAddOptimistic = async ({
  add,
  cart,
}: {
  add: string;
  cart: Cart | null;
}): Promise<CartDetailed | null> => {
  /**
   * Check product_id to be added
   * if !add
   *   check cart
   *   if !cart || cart has no lines
   *     return null
   *   retrieve from db the unit_price of product_id's in cart lines and append to cart lines
   *   return updated cart
   * else
   *   if cart
   *     append (product_id to be added, qty = 1) to cart lines
   *     retrieve from db the unit_price of product_id's in cart lines and append to cart lines
   *     return updated cart
   *   else
   *     make new cart object
   *     ...
   *
   */

  const originalCart = cart;

  let cartWithUnitPrice = null;

  if (!add) {
    if (!originalCart || originalCart.lines.length === 0) {
      return null;
    }
    cartWithUnitPrice = await getCartWithDetails(originalCart);
    return cartWithUnitPrice;
  }

  if (originalCart) {
    const originalCartWithAppendedProductLine = {
      ...originalCart,
      lines: [
        ...originalCart.lines,
        { product_id: add, qty: DEFAULT_QTY_TO_ADD_TO_CART },
      ],
    };

    cartWithUnitPrice = await getCartWithDetails(
      originalCartWithAppendedProductLine
    );
    return cartWithUnitPrice;
  }

  // No cart to begin with

  cartWithUnitPrice = await getNewCartWithProductLineToAdd(add);
  return cartWithUnitPrice;
};

// export async function getPosts(maxNumber) {
//   let limitClause = "";
//
//   if (maxNumber) {
//     limitClause = "LIMIT ?";
//   }
//
//   const stmt = db.prepare(`
//     SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
//     FROM posts
//     INNER JOIN users ON posts.user_id = users.id
//     LEFT JOIN likes ON posts.id = likes.post_id
//     GROUP BY posts.id
//     ORDER BY createdAt DESC
//     ${limitClause}`);
//
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return maxNumber ? stmt.all(maxNumber) : stmt.all();
// }
//
// export async function storePost(post) {
//   const stmt = db.prepare(`
//     INSERT INTO posts (image_url, title, content, user_id)
//     VALUES (?, ?, ?, ?)`);
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return stmt.run(post.imageUrl, post.title, post.content, post.userId);
// }
//
// export async function updatePostLikeStatus(postId, userId) {
//   const stmt = db.prepare(`
//     SELECT COUNT(*) AS count
//     FROM likes
//     WHERE user_id = ? AND post_id = ?`);
//
//   const isLiked = stmt.get(userId, postId).count === 0;
//
//   if (isLiked) {
//     const stmt = db.prepare(`
//       INSERT INTO likes (user_id, post_id)
//       VALUES (?, ?)`);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return stmt.run(userId, postId);
//   } else {
//     const stmt = db.prepare(`
//       DELETE FROM likes
//       WHERE user_id = ? AND post_id = ?`);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return stmt.run(userId, postId);
//   }
// }
