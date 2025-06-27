// import sql from "better-sqlite3";
import { validate as emailValidate } from "email-validator";

import type { Cart, Checkout } from "@/lib/commerce-kit";

export type DbProduct = {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  unit_price: number;
  img_src: string;
  description: string;
  currency: string;
};

export type DbCategory = {
  id: string;
  name: string;
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

// const db = new sql("cart.db");

const DEFAULT_CURRENCY = "USD";
// const DEFAULT_QTY_TO_ADD_TO_CART = 1;
const INPUT_MIN_LENGTH = 6;

// function initDb() {
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS cart (
//       id TEXT PRIMARY KEY,
//       currency TEXT
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS category (
//       id TEXT PRIMARY KEY,
//       name TEXT
//       )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS product (
//       id TEXT PRIMARY KEY,
//       category_id TEXT,
//       name TEXT,
//       unit_price REAL,
//       img_src TEXT,
//       description TEXT,
//       FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS product_similar (
//       id INTEGER PRIMARY KEY,
//       product_ids TEXT
//       )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS product_featured (
//       id TEXT PRIMARY KEY,
//       FOREIGN KEY(id) REFERENCES product(id) ON DELETE CASCADE
//       )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS cart_line (
//       cart_id TEXT,
//       product_id TEXT,
//       qty INTEGER,
//       unit_price REAL,
//       PRIMARY KEY(cart_id, product_id),
//       FOREIGN KEY(cart_id) REFERENCES cart(id) ON DELETE CASCADE,
//       FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS shipping_rate (
//       id TEXT PRIMARY KEY,
//       rate REAL,
//       agency TEXT,
//       duration TEXT
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS cart_checkout (
//       id TEXT PRIMARY KEY,
//       cust_email TEXT,
//       cust_shipping_fullname TEXT,
//       cust_shipping_address TEXT,
//       cust_shipping_postalcode TEXT,
//       cust_shipping_city TEXT,
//       cust_shipping_state TEXT,
//       cust_shipping_country TEXT,
//       shipping_rate_id TEXT,
//       cust_billing_fullname TEXT,
//       cust_billing_address TEXT,
//       cust_billing_postalcode TEXT,
//       cust_billing_city TEXT,
//       cust_billing_state TEXT,
//       cust_billing_country TEXT,
//       cust_billing_phone TEXT,
//       cust_credit_card_nbr TEXT,
//       cust_card_expiration_date TEXT,
//       cust_card_cvc TEXT,
//       FOREIGN KEY(id) REFERENCES cart(id) ON DELETE CASCADE,
//       FOREIGN KEY(shipping_rate_id) REFERENCES shipping_rate(id) ON DELETE SET NULL
//     )`);
//   db.exec(`
//       CREATE TABLE IF NOT EXISTS checkout_payment (
//         id TEXT PRIMARY KEY,
//         payment_nonce TEXT,
//         amount REAL,
//         FOREIGN KEY(id) REFERENCES cart_checkout(id) ON DELETE CASCADE
//       )`);
//
//   // Creating shipping rates
//   const stmt2 = db.prepare("SELECT COUNT(*) AS count FROM shipping_rate");
//
//   if (stmt2.get().count === 0) {
//     db.exec(`
//     INSERT INTO shipping_rate (id, rate, agency, duration)
//     VALUES ('USPS-3-33', 1.99, 'USPS', '3-33 days')
//   `);
//
//     db.exec(`
//     INSERT INTO shipping_rate (id, rate, agency, duration)
//     VALUES ('USPS-4-44', 0.99, 'USPS', '4-44 days')
//     `);
//
//     db.exec(`
//       INSERT INTO shipping_rate (id, rate, agency, duration)
//       VALUES ('USPS2-3-33', 10.99, 'USPS2', '3-33 days')
//       `);
//
//     db.exec(`
//     INSERT INTO shipping_rate (id, rate, agency, duration)
//     VALUES ('USPS2-4-44', 9.99, 'USPS2', '4-44 days')
//     `);
//
//     db.exec(`
//     INSERT INTO shipping_rate (id, rate, agency, duration)
//     VALUES ('SPACE', 21.37, 'Space shipping', '1 hour')
//     `);
//
//     db.exec(`
//     INSERT INTO shipping_rate (id, rate, agency, duration)
//     VALUES ('GROUND', 20.00, 'Ground shipping', '3-5 business days')
//     `);
//   }
//
//   // Creating categories
//   const stmt4 = db.prepare("SELECT COUNT(*) AS count FROM category");
//
//   if (stmt4.get().count === 0) {
//     db.exec(`
//     INSERT INTO category (id, name)
//     VALUES ('apparel', 'Apparel')
//     `);
//
//     db.exec(`
//       INSERT INTO category (id, name)
//       VALUES ('shoes', 'Shoes')
//     `);
//
//     db.exec(`
//       INSERT INTO category (id, name)
//     VALUES ('accessories', 'Accessories')
//     `);
//   }
//
//   // Creating products
//   const stmt = db.prepare("SELECT COUNT(*) AS count FROM product");
//
//   if (stmt.get().count === 0) {
//     // apparel
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('aflat_lay_tee', 'apparel', 'Flat Lay Tee', 16.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Flat_Lay_Tee.jpeg', 'Look and feel cool with this JailHouse Rock replica Tee!')
//     `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('white_tshirt_beach_juice_rose', 'apparel', 'White Tshirt Beach Juice Rose', 30.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/White_Tshirt_Beach_Juice_Rose.jpeg', 'Hit the beach and impress with this super duper cool tee!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('recess_tshirt', 'apparel', 'Recess Tshirt', 25.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Recess_Tshirt.jpeg', 'Another cool looking tee')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('male_female_red_tshirt_with_skeleton_hands_bloomfield_hills', 'apparel', 'Painted skeleton hands', 16.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Male_Female_Red_Tshirt_with_skeleton_hands_Bloomfield_Hills.jpeg', 'Painted skeleton T shirt, cool looking wear for halloween!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('men_super_heavywhite', 'apparel', 'Men Super Heavy White', 8.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/MEN_SUPER_HEAVYWEIGHT_OPEN-END.jpeg', 'Simple looking built with durable Grade One cotton for your comfort')
//   `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('male_female_white_tshirt_bloomfield_hills_with_painted_boy', 'apparel', 'Male White With Painted Boy', 12.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Male_Female_White_Tshirt_Bloomfield_Hills_with_painted_boy.jpeg', 'Discover the fun in you with this cute and fun looking tee!')
//     `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('female_white_tshirt_with_painted_girls_bloomfield_hills', 'apparel', 'Female White With Painted Girls', 48.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Female_White_Tshirt_With_Painted_Girls_Bloomfield_Hills.jpeg', 'Go fun and easy with this cartoonist tee!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('classic_unisex_detoxwater_tee', 'apparel', 'Classic Unisex Detoxwater Tee', 10.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Classic_Unisex_Detoxwater_Tee.jpeg', 'Save the water environment with this message emblazoned Tee!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('blue_tshirt_recess', 'apparel', 'Blue Tshirt Recess', 30.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Blue_Tshirt_Recess.jpeg', 'This vibrant blue t-shirt captures the essence of sunset skies. Made from soft, breathable fabric, it keeps you cool and comfortable all day. Ideal for both sports and leisure activities.')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('blue_t_shirt_reality', 'apparel', 'Blue T-shirt Reality', 25.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Blue_T_shirt_Reality.jpeg', 'Show off your wild side with this unique t-shirt. Made from 100% organic cotton, it offers both comfort and durability. Its eye-catching design makes it perfect for any casual occasion.')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('brown-nodisturbance-casual', 'apparel', 'Brown Nodisturbance Casual', 16.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Brown_Nodisturbance_Casual.jpeg', 'Free and easy on you!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('flamingo-polo-tee', 'apparel', 'Flamingo Polo Tee', 16.99, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Flamingo_Pattern_Polo_T_shirt.jpeg', 'Feel bright and colorful!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('champagne-tee', 'apparel', 'Champagne Tee', 25.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Champagne_T_shirt.jpeg', 'Feel the sunshine!')
//   `);
//
//     db.exec(`
//     INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//     VALUES ('beach-pattern-tee', 'apparel', 'Beach Pattern Tee', 32.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg', 'Lightweight and cooling, designed for beach getaways')
//   `);
//
//     // shoes
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('handmade_men_business_chelsea_boots_black_leather', 'shoes', 'Handmade Chelsea Boots Black Leather', 116.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes/handmade_men_business_chelsea_boots_black_leather.jpeg', 'High Top Handmade Men Business Chelsea Ankle Boots Black Leather')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('lowndes_dark_brown_burnished_calf', 'shoes', 'Lowndes Burnished Calf Classic Brown', 88, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes/lowndes_dark_brown_burnished_calf.jpeg', 'Dark Brown Burnished Calf Classic for Men')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('magnanni_matlin_men_shoes_brown_full_grain_leather_casual_penny', 'shoes', 'Magnanni Brown Full Grain Leather', 96.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes/magnanni_matlin_men_shoes_brown_full_grain_leather_casual_penny.jpeg', 'Magnanni Matlin III 24671 Men Shoes Brown Full Grain Leather Casual Penny Loafers')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('thick_male_black_spot_round_head_martin_boots', 'shoes', 'Black Spot Round Head Martin Boots', 99.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes/thick_male_black_spot_round_head_martin_boots.jpeg', 'Male Cotton Shoes High Top Leather Shoes Black Martin Boots Men Middle Top Leather Shoes')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('timberland_premium_6_inch_lace_up_waterproof_boot_for_men', 'shoes', 'Timberland Premium Lace Up Waterproof', 125.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes/timberland_premium_6_inch_lace_up_waterproof_boot_for_men.jpeg', 'Timberland® Premium 6-Inch Lace-Up Waterproof Boot for Men in Yellow')
//     `);
//
//     // accessories
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag1', 'accessories', 'Bag1', 25.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag1.jpeg', 'Bag Beauty')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag2', 'accessories', 'Bag2', 32.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag2.jpeg', 'Bag Beauty2')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag3', 'accessories', 'Bag3', 64.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag3.jpeg', 'Bag Beauty3')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag4', 'accessories', 'Bag4', 50.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag4.jpeg', 'Bag Beauty4')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag5', 'accessories', 'Bag5', 16.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag5.jpeg', 'Bag Beauty5')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag6', 'accessories', 'Bag6', 48.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag6.jpeg', 'Bag Beauty6')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag7', 'accessories', 'Bag7', 132.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag7.jpeg', 'Bag Beauty7')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag8', 'accessories', 'Bag8', 36.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag8.jpeg', 'Bag Beauty8')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag9', 'accessories', 'Bag9', 60.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag9.jpeg', 'Bag Beauty9')
//     `);
//
//     db.exec(`
//       INSERT INTO product (id, category_id, name, unit_price, img_src, description)
//       VALUES ('bag10', 'accessories', 'Bag10', 128.00, 'https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/accessories/Bag10.jpeg', 'Bag Beauty10')
//     `);
//   }
//
//  // Creating similar products
//   const stmt3 = db.prepare("SELECT COUNT(*) AS count FROM product_similar");
// //
//   if (stmt3.get().count === 0) {
//     db.exec(`
//     INSERT INTO product_similar (product_ids)
//     VALUES ('male_female_red_tshirt_with_skeleton_hands_bloomfield_hills,recess_tshirt,champagne-tee,flamingo-polo-tee,aflat_lay_tee,classic_unisex_detoxwater_tee'),
//     ('beach-pattern-tee,white_tshirt_beach_juice_rose'),
//     ('brown-nodisturbance-casual,men_super_heavywhite'),
//     ('female_white_tshirt_with_painted_girls_bloomfield_hills,male_female_white_tshirt_bloomfield_hills_with_painted_boy'),
//     ('magnanni_matlin_men_shoes_brown_full_grain_leather_casual_penny,handmade_men_business_chelsea_boots_black_leather,timberland_premium_6_inch_lace_up_waterproof_boot_for_men,thick_male_black_spot_round_head_martin_boots'),
//     ('bag3,bag6,bag2'),
//     ('bag7,bag4,bag1,bag8,bag9,bag5')
//   `);
//   }
//
//   // Creating similar products
//   const stmt5 = db.prepare("SELECT COUNT(*) AS count FROM product_featured");
//
//   if (stmt5.get().count === 0) {
//     db.exec(`
//     INSERT INTO product_featured (id)
//     VALUES ('magnanni_matlin_men_shoes_brown_full_grain_leather_casual_penny'),
//     ('champagne-tee'),
//     ('bag9'),
//     ('timberland_premium_6_inch_lace_up_waterproof_boot_for_men'),
//     ('aflat_lay_tee'),
//     ('bag2')
//   `);
//   }
// }
//
//initDb();

export async function cartGet(id: string): Promise<Cart | null> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_cart_by_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: id }),
    }
  );

  const rset = await res.json();

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

  if (rset.length === 0) {
    return null;
  }

  if (rset.length === 1) {
    if (rset[0].product_id === null) {
      return {
        id,
        lines: [],
        currency: "",
      };
    }
  }

  const currency = rset[0].currency;

  return {
    id,
    lines: rset,
    currency,
  };
}

export async function checkoutGet(id: string): Promise<Checkout | null> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_checkout_by_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: id }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return null;
  }

  if (rset.length === 1) {
    return rset[0];
  }

  // shouldn't reach here
  return null;
}

export async function cartTotalNetWithoutShipping(cart: Cart): Promise<number> {
  const cart_lines = cart.lines;
  const products = cart_lines.map((line) => `${line.product_id}`);
  const cart_id = cart.id;

  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/rpc/get_cart_total_net_withoutshipping",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        in_cart_id: cart_id,
        in_product_ids: [...products],
      }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return 0;
  }

  const cart_total = rset[0].cart_total;

  if (cart_total === null) {
    return 0;
  }
  return cart_total;
}

export async function cartShippingRate(
  cart: Cart
): Promise<DbShippingRate | null> {
  const cart_id = cart.id;

  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/rpc/get_shippingrate_from_cart_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cart_id }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return null;
  }

  const rec = rset[0];

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
  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/rpc/get_product_with_categoryinfo_by_product_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        in_product_id: product_id,
        in_currency: DEFAULT_CURRENCY,
      }),
    }
  );

  const rset = await res.json();

  // no such product in db
  if (rset.length === 0) {
    return null;
  }

  return rset[0];
}

async function cartLinesCount(cartId: string): Promise<number> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/rpc/get_count_cartlines_by_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cartId }),
    }
  );

  const rset = await res.json();
  return rset[0].count;
}

async function cartAddUpdate(
  cartId: string,
  product: DbProduct
): Promise<CartAddReturn> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_unique_cart_line",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cartId, in_product_id: product.id }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    try {
      const res = await fetch(
        (process.env.SUPABASE_URL as string) + "/rest/v1/cart_line",
        {
          method: "POST",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_id: cartId,
            product_id: product.id,
            qty: 1,
            unit_price: product.unit_price,
          }),
        }
      );
      if (res.status !== 201) {
        return {
          error: "Failed to create cart line",
          meta: null,
        };
      }

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

  if (rset.length === 1) {
    // update cart line for cart found
    try {
      const res = await fetch(
        (process.env.SUPABASE_URL as string) +
          "/rest/v1/rpc/increment_cart_line_qty",
        {
          method: "POST",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            in_cart_id: cartId,
            in_product_id: product.id,
          }),
        }
      );

      if (res.status !== 204) {
        return {
          error: "Failed to update cart line",
          meta: null,
        };
      }

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
  const newCartId = "pi_" + Math.random();
  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/cart",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: newCartId, currency: DEFAULT_CURRENCY }),
    }
  );
  if (res.status !== 201) {
    return {
      error: "Failed to create cart",
      meta: null,
    };
  }

  // create cart line for new cart
  const res2 = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/cart_line",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id: newCartId,
        product_id: product.id,
        qty: 1,
        unit_price: product.unit_price,
      }),
    }
  );
  if (res2.status !== 201) {
    return {
      error: "Failed to create cart line",
      meta: null,
    };
  }

  const linesCount = await cartLinesCount(newCartId);

  return {
    error: "",
    meta: {
      id: newCartId,
      linesCount,
    },
  };
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
  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/cart?select=id&id=eq." +
      id,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return false;
  }

  return true;
}

async function shippingRateExists(id: string): Promise<boolean> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/shipping_rate?select=id&id=eq." +
      id,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
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
      const res = await fetch(
        (process.env.SUPABASE_URL as string) +
          "/rest/v1/cart_line?cart_id=eq." +
          cartId +
          "&product_id=eq." +
          productId,
        {
          method: "DELETE",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 204) {
        return {
          error: "Failed to delete cart line",
          meta: null,
        };
      }

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

  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_unique_cart_line",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cartId, in_product_id: product.id }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    try {
      const res = await fetch(
        (process.env.SUPABASE_URL as string) + "/rest/v1/cart_line",
        {
          method: "POST",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_id: cartId,
            product_id: product.id,
            qty: qty,
            unit_price: product.unit_price,
          }),
        }
      );

      if (res.status !== 201) {
        return {
          error: "Failed to create cart line",
          meta: null,
        };
      }

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

  if (rset.length === 1) {
    // update cart line for cart found

    try {
      const res2 = await fetch(
        (process.env.SUPABASE_URL as string) +
          "/rest/v1/cart_line?cart_id=eq." +
          cartId +
          "&product_id=eq." +
          product.id,
        {
          method: "PATCH",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: qty,
          }),
        }
      );

      if (res2.status !== 204) {
        return {
          error: "Failed to update cart line",
          meta: null,
        };
      }

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

export async function checkoutUpdateOrInsertShippingRateId({
  shippingRateId,
  cartId,
}: {
  shippingRateId: string;
  cartId: string;
}): Promise<{ error: string }> {
  const exists = await shippingRateExists(shippingRateId);

  if (!exists) {
    return {
      error: "Invalid shipping rate",
    };
  }

  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_checkout_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cartId }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return {
      error: "Cart not found for checkout",
    };
  }

  if (rset.length === 1) {
    if (rset[0].checkout_id === null) {
      try {
        const res = await fetch(
          (process.env.SUPABASE_URL as string) + "/rest/v1/cart_checkout",
          {
            method: "POST",
            headers: {
              apikey: process.env.SUPABASE_ANON_KEY as string,
              Authorization: (" Bearer" +
                process.env.SUPABASE_ANON_KEY) as string,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: cartId,
              shipping_rate_id: shippingRateId,
            }),
          }
        );

        if (res.status !== 201) {
          return {
            error: "Failed to create cart checkout",
          };
        }

        return {
          error: "",
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e.message);

        return {
          error: "Failed to create cart checkout",
        };
      }
    }

    try {
      const res2 = await fetch(
        (process.env.SUPABASE_URL as string) +
          "/rest/v1/cart_checkout?id=eq." +
          cartId,
        {
          method: "PATCH",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipping_rate_id: shippingRateId,
          }),
        }
      );

      if (res2.status !== 204) {
        return {
          error: "Failed to update cart checkout",
        };
      }

      return {
        error: "",
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        error: "Failed to update cart checkout",
      };
    }
  }

  return {
    error: "Update cart checkout aborted: multiple checkouts found for cart",
  };
}

async function validateCheckoutUpdateOrInsert(
  checkout: Checkout
): Promise<{ errors: { field: string; errormsg: string }[] }> {
  const errors: { field: string; errormsg: string }[] = [];

  const input_email = checkout.cust_email.trim();
  if (!input_email) {
    errors.push({ field: "cust_email", errormsg: "Email is required" });
  }

  if (!emailValidate(input_email)) {
    errors.push({ field: "cust_email", errormsg: "Email is invalid" });
  }

  const input_shipping_fullname = checkout.cust_shipping_fullname.trim();
  if (!input_shipping_fullname) {
    errors.push({
      field: "cust_shipping_fullname",
      errormsg: "Name is required",
    });
  }

  if (input_shipping_fullname.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_shipping_fullname",
      errormsg: "Name must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_shipping_address = checkout.cust_shipping_address.trim();
  if (!input_shipping_address) {
    errors.push({
      field: "cust_shipping_address",
      errormsg: "Address is required",
    });
  }

  if (input_shipping_address.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_shipping_address",
      errormsg: "Address must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_shipping_postalcode = checkout.cust_shipping_postalcode.trim();
  if (!input_shipping_postalcode) {
    errors.push({
      field: "cust_shipping_postalcode",
      errormsg: "Postal code is required",
    });
  }

  if (input_shipping_postalcode.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_shipping_postalcode",
      errormsg:
        "Postal code must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_shipping_city = checkout.cust_shipping_city.trim();
  if (!input_shipping_city) {
    errors.push({
      field: "cust_shipping_city",
      errormsg: "City is required",
    });
  }

  if (input_shipping_city.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_shipping_city",
      errormsg: "City must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  // dropdown for country
  const input_shipping_country = checkout.cust_shipping_country.trim();
  if (!input_shipping_country) {
    errors.push({
      field: "cust_shipping_country",
      errormsg: "Country is required",
    });
  }

  const input_billing_fullname = checkout.cust_billing_fullname.trim();
  if (!input_billing_fullname) {
    errors.push({
      field: "cust_billing_fullname",
      errormsg: "Name is required",
    });
  }

  if (input_billing_fullname.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_billing_fullname",
      errormsg: "Name must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_billing_address = checkout.cust_billing_address.trim();
  if (!input_billing_address) {
    errors.push({
      field: "cust_billing_address",
      errormsg: "Address is required",
    });
  }

  if (input_billing_address.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_billing_address",
      errormsg: "Address must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_billing_postalcode = checkout.cust_billing_postalcode.trim();
  if (!input_billing_postalcode) {
    errors.push({
      field: "cust_billing_postalcode",
      errormsg: "Postal code is required",
    });
  }

  if (input_billing_postalcode.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_billing_postalcode",
      errormsg:
        "Postal code must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  const input_billing_city = checkout.cust_billing_city.trim();
  if (!input_billing_city) {
    errors.push({
      field: "cust_billing_city",
      errormsg: "City is required",
    });
  }

  if (input_billing_city.length < INPUT_MIN_LENGTH) {
    errors.push({
      field: "cust_billing_city",
      errormsg: "City must exceed " + (INPUT_MIN_LENGTH - 1) + " characters",
    });
  }

  // dropdown for country
  const input_billing_country = checkout.cust_billing_country.trim();
  if (!input_billing_country) {
    errors.push({
      field: "cust_billing_country",
      errormsg: "Country is required",
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }

  const input_shipping_rate_id = checkout.shipping_rate_id.trim();
  if (!input_shipping_rate_id) {
    errors.push({
      field: "shipping_rate_id",
      errormsg: "Please select Shipping method",
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }

  const exists = await shippingRateExists(checkout.shipping_rate_id);

  if (!exists) {
    errors.push({
      field: "shipping_rate_id",
      errormsg: "Invalid shipping rate",
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }

  return {
    errors: [],
  };
}

export async function validateCheckout(checkout: Checkout): Promise<number> {
  const validationErrors = await validateCheckoutUpdateOrInsert(checkout);

  if (validationErrors.errors.length) {
    return -1;
  }
  return 0;
}

export async function checkoutUpdateOrInsert({
  checkout,
  cartId,
}: {
  checkout: Checkout;
  cartId: string;
}): Promise<{ errors: { field: string; errormsg: string }[] }> {
  const validationErrors = await validateCheckoutUpdateOrInsert(checkout);

  if (validationErrors.errors.length) {
    return validationErrors;
  }

  const res = await fetch(
    (process.env.SUPABASE_URL as string) + "/rest/v1/rpc/get_checkout_id",
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_cart_id: cartId }),
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return {
      errors: [{ field: "checkout", errormsg: "Cart not found for checkout" }],
    };
  }

  if (rset.length === 1) {
    if (rset[0].checkout_id === null) {
      try {
        const res = await fetch(
          (process.env.SUPABASE_URL as string) + "/rest/v1/cart_checkout",
          {
            method: "POST",
            headers: {
              apikey: process.env.SUPABASE_ANON_KEY as string,
              Authorization: (" Bearer" +
                process.env.SUPABASE_ANON_KEY) as string,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: cartId,
              cust_email: checkout.cust_email.trim(),
              cust_shipping_fullname: checkout.cust_shipping_fullname.trim(),
              cust_shipping_address: checkout.cust_shipping_address.trim(),
              cust_shipping_postalcode:
                checkout.cust_shipping_postalcode.trim(),
              cust_shipping_city: checkout.cust_shipping_city.trim(),
              cust_shipping_state: checkout.cust_shipping_state.trim(),
              cust_shipping_country: checkout.cust_shipping_country.trim(),
              shipping_rate_id: checkout.shipping_rate_id.trim(),
              cust_billing_fullname: checkout.cust_billing_fullname.trim(),
              cust_billing_address: checkout.cust_billing_address.trim(),
              cust_billing_postalcode: checkout.cust_billing_postalcode.trim(),
              cust_billing_city: checkout.cust_billing_city.trim(),
              cust_billing_state: checkout.cust_billing_state.trim(),
              cust_billing_country: checkout.cust_billing_country.trim(),
              cust_billing_phone: checkout.cust_billing_phone.trim(),
            }),
          }
        );

        if (res.status !== 201) {
          return {
            errors: [
              { field: "checkout", errormsg: "Failed to create cart checkout" },
            ],
          };
        }

        return {
          errors: [],
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e.message);

        return {
          errors: [
            { field: "checkout", errormsg: "Failed to create cart checkout" },
          ],
        };
      }
    }

    try {
      const res2 = await fetch(
        (process.env.SUPABASE_URL as string) +
          "/rest/v1/cart_checkout?id=eq." +
          cartId,
        {
          method: "PATCH",
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY as string,
            Authorization: (" Bearer" +
              process.env.SUPABASE_ANON_KEY) as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cust_email: checkout.cust_email.trim(),
            cust_shipping_fullname: checkout.cust_shipping_fullname.trim(),
            cust_shipping_address: checkout.cust_shipping_address.trim(),
            cust_shipping_postalcode: checkout.cust_shipping_postalcode.trim(),
            cust_shipping_city: checkout.cust_shipping_city.trim(),
            cust_shipping_state: checkout.cust_shipping_state.trim(),
            cust_shipping_country: checkout.cust_shipping_country.trim(),
            shipping_rate_id: checkout.shipping_rate_id.trim(),
            cust_billing_fullname: checkout.cust_billing_fullname.trim(),
            cust_billing_address: checkout.cust_billing_address.trim(),
            cust_billing_postalcode: checkout.cust_billing_postalcode.trim(),
            cust_billing_city: checkout.cust_billing_city.trim(),
            cust_billing_state: checkout.cust_billing_state.trim(),
            cust_billing_country: checkout.cust_billing_country.trim(),
            cust_billing_phone: checkout.cust_billing_phone.trim(),
          }),
        }
      );

      if (res2.status !== 204) {
        return {
          errors: [
            {
              field: "checkout",
              errormsg: "Failed to update cart checkout",
            },
          ],
        };
      }

      return {
        errors: [],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);

      return {
        errors: [
          {
            field: "checkout",
            errormsg: "Failed to update cart checkout",
          },
        ],
      };
    }
  }

  return {
    errors: [
      {
        field: "checkout",
        errormsg:
          "Update cart checkout aborted: multiple checkouts found for cart",
      },
    ],
  };
}

export async function insertPayment({
  total,
  nonce,
  cartId,
}: {
  total: number;
  nonce: string;
  cartId: string;
}): Promise<{ error: string }> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) + "/rest/v1/checkout_payment",
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cartId,
          payment_nonce: nonce,
          amount: total,
        }),
      }
    );

    if (res.status !== 201) {
      return {
        error: "Failed to create payment record",
      };
    }

    return {
      error: "",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log("Failed to create payment record", e.message);
    return {
      error: "Failed to create payment record",
    };
  }
}

export async function getShippingRates(): Promise<
  {
    id: string;
    rate: number;
    rate_currency: string;
    agency: string;
    duration: string;
  }[]
> {
  const res = await fetch(
    (process.env.SUPABASE_URL as string) +
      "/rest/v1/shipping_rate?select=id,rate,agency,duration",
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY as string,
        Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
        "Content-Type": "application/json",
      },
    }
  );

  const rset = await res.json();

  if (rset.length === 0) {
    return [];
  }

  for (let idx = 0; idx < rset.length; idx++) {
    rset[idx]["rate_currency"] = DEFAULT_CURRENCY;
  }

  return rset;

  // const stmt = db.prepare(`
  //   SELECT
  //     id, rate, '${DEFAULT_CURRENCY}' as rate_currency, agency, duration
  //   FROM shipping_rate`);
  //
  // const resultset = stmt.all();
  //
  // if (resultset.length === 0) {
  //   return [];
  // }
  //
  // return resultset;
}

export async function getProductsSimilar(
  product_id: string
): Promise<DbProduct[] | { error: string }> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/rpc/get_similar_products",
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          in_product_id: product_id,
          in_currency: DEFAULT_CURRENCY,
        }),
      }
    );

    if (res.status !== 200) {
      return {
        error: "Failed to SELECT similar products",
      };
    }

    const rset = await res.json();

    if (rset.length === 0) {
      return [];
    }

    return rset;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT similar products",
    };
  }
}

export async function getProductsAll(): Promise<
  DbProduct[] | { error: string }
> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/product?select=id,name,unit_price,img_src",
      {
        method: "GET",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
      }
    );

    const rset = await res.json();

    if (rset.length === 0) {
      return [];
    }

    for (let idx = 0; idx < rset.length; idx++) {
      rset[idx]["currency"] = DEFAULT_CURRENCY;
    }

    return rset;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT products",
    };
  }
}

export async function getProductsFeatured(): Promise<
  DbProduct[] | { error: string }
> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/rpc/get_featured_products",
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ in_currency: DEFAULT_CURRENCY }),
      }
    );

    const rset = await res.json();

    if (rset.length === 0) {
      return [];
    }

    return rset;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT featured products",
    };
  }
}

export async function getProductsCategory(
  category: string
): Promise<DbProduct[] | { error: string }> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/product?select=id,name,unit_price,img_src&category_id=eq." +
        category,
      {
        method: "GET",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
      }
    );

    const rset = await res.json();

    if (rset.length === 0) {
      return [];
    }

    for (let idx = 0; idx < rset.length; idx++) {
      rset[idx]["currency"] = DEFAULT_CURRENCY;
    }

    return rset;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT products",
    };
  }
}

export async function getCategory(
  id: string
): Promise<DbCategory | null | { error: string }> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/category?select=id,name&id=eq." +
        id,
      {
        method: "GET",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
      }
    );

    const rset = await res.json();

    if (rset.length === 0) {
      return null;
    }

    return rset[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT category",
    };
  }
}

export async function getProductForHtmlHead(
  product_id: string
): Promise<{ name: string; description: string } | null | { error: string }> {
  try {
    const res = await fetch(
      (process.env.SUPABASE_URL as string) +
        "/rest/v1/product?select=id,name,description&id=eq." +
        product_id,
      {
        method: "GET",
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY as string,
          Authorization: (" Bearer" + process.env.SUPABASE_ANON_KEY) as string,
          "Content-Type": "application/json",
        },
      }
    );

    const rset = await res.json();

    if (rset.length === 0) {
      return null;
    }

    return rset[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message);

    return {
      error: "Failed to SELECT product",
    };
  }
}
