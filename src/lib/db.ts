import sql from "better-sqlite3";

import type { Cart, Checkout } from "@/lib/commerce-kit";

type DbProduct = {
  id: string;
  name: string;
  unit_price: number;
  img_src: string;
};

export type DbShippingRate = {
  id: string;
  rate: number;
  agency: string;
  duration: string;
};

export interface CartAddReturn {
  error: string;
  meta: {
    id: string;
    linesCount: number;
  } | null;
}

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
      img_src TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_line (
      cart_id TEXT, 
      product_id TEXT, 
      qty INTEGER, 
      unit_price REAL,
      PRIMARY KEY(cart_id, product_id),
      FOREIGN KEY(cart_id) REFERENCES cart(id) ON DELETE CASCADE, 
      FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS shipping_rate (
      id TEXT PRIMARY KEY, 
      rate REAL,
      agency TEXT,
      duration TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_checkout (
      id TEXT PRIMARY KEY, 
      cust_email TEXT,
      cust_shipping_fullname TEXT,
      cust_shipping_address TEXT,
      cust_shipping_postalcode TEXT,
      cust_shipping_city TEXT,
      cust_shipping_state TEXT,
      cust_shipping_country TEXT,
      shipping_rate_id TEXT,
      cust_billing_fullname TEXT,
      cust_billing_address TEXT,
      cust_billing_postalcode TEXT,
      cust_billing_city TEXT,
      cust_billing_state TEXT,
      cust_billing_country TEXT,
      cust_billing_phone TEXT,
      cust_credit_card_nbr TEXT,
      cust_card_expiration_date TEXT,
      cust_card_cvc TEXT,
      FOREIGN KEY(id) REFERENCES cart(id) ON DELETE CASCADE,
      FOREIGN KEY(shipping_rate_id) REFERENCES shipping_rate(id) ON DELETE SET NULL
    )`);

  // Creating shipping rates
  const stmt2 = db.prepare("SELECT COUNT(*) AS count FROM shipping_rate");

  if (stmt2.get().count === 0) {
    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('USPS-3-33', 1.99, 'USPS', '3-33 days')
  `);

    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('USPS-4-44', 0.99, 'USPS', '4-44 days')
    `);

    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('USPS2-3-33', 10.99, 'USPS2', '3-33 days')
    `);

    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('USPS2-4-44', 9.99, 'USPS2', '4-44 days')
    `);

    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('SPACE', 21.37, 'Space shipping', '1 hour')
    `);

    db.exec(`
    INSERT INTO shipping_rate (id, rate, agency, duration)
    VALUES ('GROUND', 20.00, 'Ground shipping', '3-5 business days')
    `);
  }

  // Creating products
  const stmt = db.prepare("SELECT COUNT(*) AS count FROM product");

  if (stmt.get().count === 0) {
    db.exec(`
    INSERT INTO product (id, name, unit_price, img_src)
    VALUES ('gloves-with-holes', 'Gloves with holes', 6.99, '/img-glove.jpg')
  `);

    db.exec(`
    INSERT INTO product (id, name, unit_price, img_src)
    VALUES ('arctic-circle-neck-warmer', 'Arctic Circle Neck Warmer', 16.99, '/img-arctic.jpg')
  `);

    db.exec(`
    INSERT INTO product (id, name, unit_price, img_src)
    VALUES ('sunbeam-tote-ray-tomasz', 'Sunbeam Tote Ray Tomasz', 25.00, '/img-tomasz.jpg')
  `);

    db.exec(`
    INSERT INTO product (id, name, unit_price, img_src)
    VALUES ('one-shoe', 'One Shoe', 32.00, '/one-shoe.jpg')
  `);
  }
}

initDb();

export async function cartGet(id: string): Promise<Cart | null> {
  // const stmt = db.prepare(`
  //   SELECT c.id, c.currency, cl.product_id, cl.qty
  //   FROM cart AS c
  //   INNER JOIN cart_line AS cl
  //   ON c.id = cl.cart_id
  //   INNER JOIN product AS p
  //   ON cl.product_id = p.id
  //   WHERE c.id = ?`);

  const stmt = db.prepare(`
    SELECT c.id, c.currency, cl.product_id, cl.qty, p.name, p.unit_price, p.img_src, cl.qty * p.unit_price AS line_total
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

  const currency = resultset[0].currency;

  return {
    id,
    lines: resultset,
    currency,
  };
}

export async function checkoutGet(id: string): Promise<Checkout | null> {
  const stmt = db.prepare(`
    SELECT 
      cust_email,
      IFNULL( cust_shipping_fullname, '') AS cust_shipping_fullname,
      cust_shipping_address,
      cust_shipping_postalcode,
      cust_shipping_city,
      cust_shipping_state,
      cust_shipping_country,
      sr.id AS shipping_rate_id,
      cust_billing_fullname,
      cust_billing_address,
      cust_billing_postalcode,
      cust_billing_city,
      cust_billing_state,
      cust_billing_country,
      cust_billing_phone,
      cust_credit_card_nbr,
      cust_card_expiration_date,
      cust_card_cvc
    FROM cart AS c
    INNER JOIN cart_checkout AS ck
    ON c.id = ck.id
    LEFT OUTER JOIN shipping_rate AS sr
    ON ck.shipping_rate_id = sr.id
    WHERE c.id = ?`);

  const resultset = stmt.all(id);

  if (resultset.length === 0) {
    return null;
  }

  if (resultset.length === 1) {
    return resultset[0];
  }

  // shouldn't reach here
  return null;
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

export async function cartShippingRate(
  cart: Cart
): Promise<DbShippingRate | null> {
  const cart_id = cart.id;

  const stmt = db.prepare(`
    SELECT sr.id, sr.rate, sr.agency, sr.duration
    FROM cart AS c
    INNER JOIN cart_checkout AS ck
    ON c.id = ck.id
    INNER JOIN shipping_rate AS sr
    ON ck.shipping_rate_id = sr.id
    WHERE c.id = ?`);

  const resultset = stmt.all(cart_id);

  if (resultset.length === 0) {
    return null;
  }

  const rec = resultset[0];

  return {
    id: rec.id,
    rate: rec.rate,
    agency: rec.agency,
    duration: rec.duration,
  };
}

export async function getProduct(
  product_id: string
): Promise<DbProduct | null> {
  const stmt = db.prepare(`
    SELECT id, name, unit_price, img_src
    FROM product
    WHERE id = ?`);

  const resultset = stmt.all(product_id);

  // no such product in db
  if (resultset.length === 0) {
    return null;
  }

  return resultset[0];
}

async function cartLinesCount(cartId: string): Promise<number> {
  const stmtLinesCount = db.prepare(`
    SELECT c.id, cl.product_id
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ?`);
  const resultset = stmtLinesCount.all(cartId);

  return resultset.length;
}

async function cartAddUpdate(
  cartId: string,
  product: DbProduct
): Promise<CartAddReturn> {
  // const stmt = db.prepare(`
  //   SELECT c.id, c.currency, cl.product_id, cl.qty
  //   FROM cart AS c
  //   INNER JOIN cart_line AS cl
  //   ON c.id = cl.cart_id
  //   INNER JOIN product AS p
  //   ON cl.product_id = p.id
  //   WHERE c.id = ?`);

  const stmt = db.prepare(`
    SELECT c.id, cl.product_id
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ?
    AND cl.product_id = ?`);

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
  console.log("cartId", cartId);
  const resultset = stmt.all(cartId, product.id);

  if (resultset.length === 0) {
    // return {
    //   error: "Failed to find cart with given id",
    //   meta: null,
    // };
    // create cart line for cart, assuming cart already exists
    try {
      const stmt = db.prepare(`
          INSERT INTO cart_line (cart_id, product_id, qty, unit_price)
          VALUES (?, ?, ?, ?)`);
      stmt.run(
        cartId,
        product.id,
        DEFAULT_QTY_TO_ADD_TO_CART,
        product.unit_price
      );

      const linesCount = await cartLinesCount(cartId);

      return {
        error: "",
        meta: { id: cartId, linesCount },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to create cart line",
        meta: null,
      };
    }
  }

  if (resultset.length === 1) {
    // update cart line for cart found
    try {
      const stmt = db.prepare(`
      UPDATE cart_line
      SET qty = qty + 1
      WHERE cart_id = ?
      AND product_id = ?`);
      stmt.run(cartId, product.id);

      const linesCount = await cartLinesCount(cartId);

      return {
        error: "",
        meta: { id: cartId, linesCount },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to update cart line",
        meta: null,
      };
    }
  }

  return {
    error: "Add to cart aborted: multiple cart lines found for given product",
    meta: null,
  };
}

async function cartAddCreate(product: DbProduct): Promise<CartAddReturn> {
  const TRIES = 2;
  let insertCartOk = false;
  let newCartId = "";

  for (let index = 0; index < TRIES; index++) {
    try {
      newCartId = "pi_" + Math.random();
      const stmt = db.prepare(`
    INSERT INTO cart (id, currency)
    VALUES (?, ?)`);
      stmt.run(newCartId, DEFAULT_CURRENCY);
      insertCartOk = true;
      break;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);
    }
  }

  if (!insertCartOk) {
    return {
      error: "Failed to create cart",
      meta: null,
    };
  }

  // create cart line for new cart
  try {
    const stmt = db.prepare(`
    INSERT INTO cart_line (cart_id, product_id, qty, unit_price)
    VALUES (?, ?, ?, ?)`);
    stmt.run(
      newCartId,
      product.id,
      DEFAULT_QTY_TO_ADD_TO_CART,
      product.unit_price
    );

    const linesCount = await cartLinesCount(newCartId);

    return {
      error: "",
      meta: {
        id: newCartId,
        linesCount,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to create cart line",
      meta: null,
    };
  }
}

export async function cartAdd({
  productId,
  cartId,
}: {
  productId: string;
  cartId: string;
}): Promise<CartAddReturn> {
  const product = await getProduct(productId);

  if (!product) {
    return {
      error: "No such product",
      meta: null,
    };
  }

  if (!cartId) {
    const ret = await cartAddCreate(product);
    return ret;
  }

  const ret = await cartAddUpdate(cartId, product);
  return ret;
}

async function cartExists(id: string): Promise<boolean> {
  const stmt = db.prepare(`
    SELECT c.id
    FROM cart AS c
    WHERE c.id = ?`);

  const resultset = stmt.all(id);

  if (resultset.length === 0) {
    return false;
  }

  return true;
}

export async function cartUpdate({
  qty,
  productId,
  cartId,
}: {
  qty: number;
  productId: string;
  cartId: string;
}): Promise<CartAddReturn> {
  const product = await getProduct(productId);

  if (!product) {
    return {
      error: "No such product",
      meta: null,
    };
  }

  const isCartExists = await cartExists(cartId);

  if (!isCartExists) {
    return {
      error: "Cart not found",
      meta: null,
    };
  }

  if (qty === 0) {
    // DELETE cart line
    try {
      const stmt = db.prepare(`
        DELETE FROM cart_line
        WHERE cart_id = ?
        AND product_id = ?`);
      stmt.run(cartId, productId);

      const linesCount = await cartLinesCount(cartId);

      return {
        error: "",
        meta: { id: cartId, linesCount },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to delete cart line",
        meta: null,
      };
    }
  }

  const stmt = db.prepare(`
    SELECT c.id, cl.product_id
    FROM cart AS c
    LEFT OUTER JOIN cart_line AS cl
    ON c.id = cl.cart_id
    LEFT OUTER JOIN product AS p
    ON cl.product_id = p.id
    WHERE c.id = ?
    AND cl.product_id = ?`);

  console.log("cartId", cartId);
  const resultset = stmt.all(cartId, product.id);

  if (resultset.length === 0) {
    // return {
    //   error: "Failed to find cart with given id",
    //   meta: null,
    // };
    // create cart line for cart, assuming cart already exists
    try {
      const stmt = db.prepare(`
          INSERT INTO cart_line (cart_id, product_id, qty, unit_price)
          VALUES (?, ?, ?, ?)`);
      stmt.run(cartId, product.id, qty, product.unit_price);

      const linesCount = await cartLinesCount(cartId);

      return {
        error: "",
        meta: { id: cartId, linesCount },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to create cart line",
        meta: null,
      };
    }
  }

  if (resultset.length === 1) {
    // update cart line for cart found
    try {
      const stmt = db.prepare(`
      UPDATE cart_line
      SET qty = ?
      WHERE cart_id = ?
      AND product_id = ?`);
      stmt.run(qty, cartId, product.id);

      const linesCount = await cartLinesCount(cartId);

      return {
        error: "",
        meta: { id: cartId, linesCount },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to update cart line",
        meta: null,
      };
    }
  }

  return {
    error: "Add to cart aborted: multiple cart lines found for given product",
    meta: null,
  };
}
