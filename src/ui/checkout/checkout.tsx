"use client";

import { useMemo, useReducer, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ip3country from "ip3country";
import { getCodeList } from "country-list";

ip3country.init();

const countrylist = getCodeList();

import * as Commerce from "@/lib/commerce-kit";
import {
  checkoutUpdateOrInsertShippingRateAction,
  checkoutUpdateOrInsertAction,
} from "@/actions/cart-actions";

type FormState = Commerce.Checkout;

function reducer(
  state: FormState,
  action: { type: keyof FormState; payload: string }
): FormState {
  return { ...state, [action.type]: action.payload };
}

const initialFormValues: FormState = {
  cust_email: "",
  cust_shipping_fullname: "",
  cust_shipping_address: "",
  cust_shipping_postalcode: "",
  cust_shipping_city: "",
  cust_shipping_country: "",
  shipping_rate_id: "",
};

export default function Checkout({
  checkout,
}: {
  checkout: Commerce.Checkout | null;
}) {
  console.log("checkout111111111111", checkout);

  const [formValues, dispatcher] = useReducer(
    reducer,
    checkout || initialFormValues
  );
  console.log("formValues", formValues);

  const currentFieldId = useRef("");
  const formValuesRef = useRef(initialFormValues);

  const onValueChange = useMemo(
    () =>
      function (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        currentFieldId.current = evt.target.id;

        if (evt.target.name === "shipping_rate_id") {
          // radio button
          const pos = errorsRef.current.findIndex(
            (err) =>
              err.field === "shipping_rate_id" &&
              err.errormsg.includes("lease select") // "Please select a Shipping method option"
          );

          if (pos > -1) {
            const dupErrors = [...errorsRef.current];
            dupErrors.splice(pos, 1);
            setErrors(dupErrors);
          }
        }

        dispatcher({
          type: evt.target.name as keyof FormState,
          payload: evt.target.value,
        });
      },
    []
  );

  const [pending, setPending] = useState(false);
  const [pendingShippingRate, setPendingShippingRate] = useState(false);
  const [errors, setErrors] = useState<{ field: string; errormsg: string }[]>(
    []
  );
  const [billingAddrEqShipping, setBillingAddrEqShipping] = useState(true);

  const errorsRef = useRef(errors);

  useEffect(() => {
    async function ip2Country() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        // Lookup using ip4 str
        const country_code = ip3country.lookupStr(data.ip);

        if (!country_code) {
          return;
        }

        const countryCode = country_code.toLowerCase();

        if (!countrylist[countryCode]) {
          return;
        }

        if (formValues.cust_shipping_country) {
          return;
        }

        dispatcher({
          type: "cust_shipping_country",
          payload: countryCode,
        });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }
    ip2Country();
  }, []);

  const router = useRouter();

  const formActionCheckoutUpdateOrInsertShippingRate = useMemo(
    () =>
      async function (evt: React.ChangeEvent<HTMLInputElement>) {
        setPendingShippingRate(true);
        setPending(true);

        const res = await checkoutUpdateOrInsertShippingRateAction(
          evt.target.value
        );

        setPendingShippingRate(false);
        setPending(false);

        if (res.error) {
          toast(res.error);
        } else {
          router.refresh();
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formActionPaynow = useMemo(
    () =>
      async function () {
        setPending(true);

        const res = await checkoutUpdateOrInsertAction(formValuesRef.current);

        setPending(false);

        if (res.errors.length) {
          // toast(JSON.stringify(res));
          const pos = res.errors.findIndex((err) => err.field === "checkout");
          if (pos > -1) {
            toast(res.errors[pos].errormsg);

            const filteredErrors = res.errors.filter(
              (err) => err.field !== "checkout"
            );

            if (filteredErrors.length) {
              setErrors(filteredErrors);
            }
          } else {
            setErrors(res.errors);
          }

          return;
        }

        router.refresh();
        // todo braintree payment
      },
    []
  );

  formValuesRef.current = formValues;
  errorsRef.current = errors;

  const getFieldError = useMemo(
    () =>
      function (fieldname: string) {
        if (errorsRef.current.length) {
          const pos = errorsRef.current.findIndex(
            (err) => err.field === fieldname
          );

          if (pos > -1) {
            return errorsRef.current[pos].errormsg;
          }
          return "";
        } else {
          return "";
        }
      },
    []
  );

  return (
    <form className="Checkout position-relative">
      <input
        type="text"
        inputMode="email"
        name="cust_email"
        id="cust_email"
        placeholder="you@example.com"
        value={formValues.cust_email}
        onChange={onValueChange}
      />
      {getFieldError("cust_email") ? (
        <span>{getFieldError("cust_email")}</span>
      ) : null}
      <input
        type="text"
        name="cust_shipping_fullname"
        id="cust_shipping_fullname"
        placeholder="cust_shipping_fullname"
        value={formValues.cust_shipping_fullname}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_fullname") ? (
        <span>{getFieldError("cust_shipping_fullname")}</span>
      ) : null}
      <input
        type="text"
        name="cust_shipping_address"
        id="cust_shipping_address"
        placeholder="cust_shipping_address"
        value={formValues.cust_shipping_address}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_address") ? (
        <span>{getFieldError("cust_shipping_address")}</span>
      ) : null}
      <input
        type="text"
        name="cust_shipping_postalcode"
        id="cust_shipping_postalcode"
        placeholder="cust_shipping_postalcode"
        value={formValues.cust_shipping_postalcode}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_postalcode") ? (
        <span>{getFieldError("cust_shipping_postalcode")}</span>
      ) : null}
      <input
        type="text"
        name="cust_shipping_city"
        id="cust_shipping_city"
        placeholder="cust_shipping_city"
        value={formValues.cust_shipping_city}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_city") ? (
        <span>{getFieldError("cust_shipping_city")}</span>
      ) : null}
      {/* <input
        type="text"
        name="cust_shipping_state"
        id="cust_shipping_state"
        placeholder="cust_shipping_state"
      /> */}
      <select
        name="cust_shipping_country"
        id="cust_shipping_country"
        value={formValues.cust_shipping_country}
        onChange={onValueChange}
      >
        <option value=""></option>
        {Object.entries(countrylist).map((keyVal) => (
          <option value={keyVal[0]} key={keyVal[0]}>
            {keyVal[1]}
          </option>
        ))}
      </select>
      {getFieldError("cust_shipping_country") ? (
        <span>{getFieldError("cust_shipping_country")}</span>
      ) : null}
      {getFieldError("shipping_rate_id") ? (
        <span>{getFieldError("shipping_rate_id")}</span>
      ) : null}
      <fieldset>
        <legend>Shipping method</legend>
        <div role="radiodroup">
          <input
            type="radio"
            name="shipping_rate_id"
            value="USPS-3-33"
            checked={formValues.shipping_rate_id === "USPS-3-33"}
            onChange={(evt) => {
              onValueChange(evt);
              formActionCheckoutUpdateOrInsertShippingRate(evt);
            }}
            disabled={pending}
            id="shipping_rate_id_USPS-3-33"
          />
          <label
            htmlFor="shipping_rate_id_USPS-3-33"
            className="Checkout__label-for-shipping_rate_id"
          >
            USPS-3-33 | 1.99 | 3-33 days{" "}
            {pendingShippingRate &&
            currentFieldId.current === "shipping_rate_id_USPS-3-33" ? (
              <span className="loader"></span>
            ) : null}
          </label>
          <br />
          <input
            type="radio"
            name="shipping_rate_id"
            value="USPS-4-44"
            checked={formValues.shipping_rate_id === "USPS-4-44"}
            onChange={(evt) => {
              onValueChange(evt);
              formActionCheckoutUpdateOrInsertShippingRate(evt);
            }}
            disabled={pending}
            id="shipping_rate_id_USPS-4-44"
          />
          <label
            htmlFor="shipping_rate_id_USPS-4-44"
            className="Checkout__label-for-shipping_rate_id"
          >
            USPS-4-44 | 0.99 | 4-44 days{" "}
            {pendingShippingRate &&
            currentFieldId.current === "shipping_rate_id_USPS-4-44" ? (
              <span className="loader"></span>
            ) : null}
          </label>
        </div>
      </fieldset>
      <input
        type="checkbox"
        id="cbx-billing-addr-eq-shipping"
        checked={billingAddrEqShipping}
        onChange={() => {
          setBillingAddrEqShipping((prev) => !prev);
        }}
      />
      <label
        htmlFor="cbx-billing-addr-eq-shipping"
        className="Checkout__label-for-cbx-billing-addr-eq-shipping"
      >
        Billing address same as shipping
      </label>
      {/* <fieldset>
        <legend>Billing address</legend>
        <input
          type="text"
          name="cust_billing_fullname"
          id="cust_billing_fullname"
          placeholder="cust_billing_fullname"
        />
        <input
          type="text"
          name="cust_billing_country"
          id="cust_billing_country"
          placeholder="cust_billing_country"
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
      </p> */}
      <button type="button" disabled={pending} onClick={formActionPaynow}>
        Pay now
      </button>
      <div
        className={`${
          pending ? "d-block" : "d-none"
        } position-absolute top-0 bottom-0 start-0 end-0 bg-dark opacity-25`}
      ></div>
    </form>
  );
}
