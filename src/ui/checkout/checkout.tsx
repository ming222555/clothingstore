"use client";

import { useMemo, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      function (evt: React.ChangeEvent<HTMLInputElement>) {
        currentFieldId.current = evt.target.id;

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

  const errorsRef = useRef(errors);

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
        placeholder="cust_shipping_fullname"
        value={formValues.cust_shipping_fullname}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_fullname") ? (
        <span>{getFieldError("cust_shipping_fullname")}</span>
      ) : null}
      {/* <input
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
      /> */}

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
            htmlFor="shippingRate-USPS-3-33"
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
            htmlFor="shippingRate-USPS-4-44"
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
      <p>Billing address same as shipping</p>
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
