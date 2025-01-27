"use client";

export default function Checkout() {
  return (
    <form>
      <input
        type="text"
        inputMode="email"
        name="cust_email"
        id="cust_email"
        placeholder="you@example.com"
      />
      <input
        type="text"
        name="cust_shipping_fullname"
        id="cust_shipping_fullname"
        placeholder="cust_shipping_fullname"
      />
      <input
        type="text"
        name="cust_shipping_address"
        id="cust_shipping_address"
        placeholder="cust_shipping_address"
      />
      <input
        type="text"
        name="cust_shipping_postalcode"
        id="cust_shipping_postalcode"
        placeholder="cust_shipping_postalcode"
      />
      <input
        type="text"
        name="cust_shipping_city"
        id="cust_shipping_city"
        placeholder="cust_shipping_city"
      />
      <input
        type="text"
        name="cust_shipping_state"
        id="cust_shipping_state"
        placeholder="cust_shipping_state"
      />
      <input
        type="text"
        name="cust_shipping_country"
        id="cust_shipping_country"
        placeholder="cust_shipping_country"
      />
      <fieldset>
        <legend>Shipping method</legend>
        <div role="radiodroup">
          <input
            type="radio"
            name="shippingRate"
            id="shippingRate-USPS-3-33"
            value="USPS-3-33"
          />
          <label htmlFor="shippingRate-USPS-3-33">
            USPS-3-33 | 1.99 | 3-33 days
          </label>
          <br />
          <input
            type="radio"
            name="shippingRate"
            id="shippingRate-USPS-4-44"
            value="USPS-4-44"
          />
          <label htmlFor="shippingRate-USPS-4-44">
            USPS-4-44 | 0.99 | 4-44 days
          </label>
        </div>
      </fieldset>
      <p>Billing address same as shipping</p>
      <fieldset>
        <legend>Billing address</legend>
        <input
          type="text"
          name="cust_billing_fullname"
          id="cust_billing_fullname"
          placeholder="cust_billing_fullname"
        />
        <input
          type="text"
          name="cust_billing_address"
          id="cust_billing_address"
          placeholder="cust_billing_address"
        />
        <input
          type="text"
          name="cust_billing_postalcode"
          id="cust_billing_postalcode"
          placeholder="cust_billing_postalcode"
        />
        <input
          type="text"
          name="cust_billing_city"
          id="cust_billing_city"
          placeholder="cust_billing_city"
        />
        <input
          type="text"
          name="cust_billing_state"
          id="cust_billing_state"
          placeholder="cust_billing_state"
        />
        <input
          type="text"
          name="cust_billing_country"
          id="cust_billing_country"
          placeholder="cust_billing_country"
        />
        <input
          type="text"
          name="cust_billing_phone"
          id="cust_billing_phone"
          placeholder="cust_billing_phone"
        />
      </fieldset>
      <span style={{ background: "lightgray", padding: 0, margin: 0 }}>
        PayPal
      </span>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Card number
      </p>
      <span style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Expiration date
      </span>
      <span style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Security code
      </span>
      <br />
      <button>Pay now</button>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
    </form>
  );
}
