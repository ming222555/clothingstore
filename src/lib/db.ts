import sql from "better-sqlite3";

import type { Cart } from "@/lib/commerce-kit";

const db = new sql("cart.db");

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
      price REAL
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
    INSERT INTO product (id, name, price)
    VALUES ('gloves-with-holes', 'Gloves with holes', 4.99)
  `);

    db.exec(`
    INSERT INTO product (id, name, price)
    VALUES ('arctic-circle-neck-warmer', 'Arctic Circle Neck Warmer', 16)
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

export async function cartTotalNetWithoutShipping(cart: Cart): Promise<number> {
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
    SELECT SUM( cl.qty * p.price) AS cart_total
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
