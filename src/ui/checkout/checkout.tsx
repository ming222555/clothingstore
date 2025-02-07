"use client";

import { useMemo, useReducer, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import braintree, { HostedFields } from "braintree-web";
import ip3country from "ip3country";
import { getCodeList } from "country-list";

// import {
// getBraintreeClientTokenAction,
//  braintreeMakePaymentAction,
// } from "@/actions/braintree-actions";

ip3country.init();

const countrylist = getCodeList();

import * as Commerce from "@/lib/commerce-kit";
import {
  checkoutUpdateOrInsertShippingRateAction,
  checkoutUpdateOrInsertAction,
} from "@/actions/cart-actions";

type FormState = Commerce.Checkout;

const initialFormValues: FormState = {
  cust_email: "",
  cust_shipping_fullname: "",
  cust_shipping_address: "",
  cust_shipping_postalcode: "",
  cust_shipping_city: "",
  cust_shipping_state: "",
  cust_shipping_country: "",
  shipping_rate_id: "",
  cust_billing_fullname: "",
  cust_billing_address: "",
  cust_billing_postalcode: "",
  cust_billing_city: "",
  cust_billing_state: "",
  cust_billing_country: "",
  cust_billing_phone: "",
};

export default function Checkout({
  checkout,
  preValidationOk,
}: {
  checkout: Commerce.Checkout | null;
  preValidationOk: boolean | null;
}) {
  console.log("checkout111111111111", checkout);

  const reducer = useMemo(() => {
    return function (
      state: FormState,
      action: { type: keyof FormState; payload: string }
    ): FormState {
      const pos = action.type.indexOf("cust_shipping_");

      if (pos < 0) {
        // not "cust_shipping_"
        return { ...state, [action.type]: action.payload };
      }

      if (!billingAddrEqShippingRef.current) {
        return { ...state, [action.type]: action.payload };
      }

      const entity = action.type.substring("cust_shipping_".length);
      const billingField = "cust_billing_" + entity;

      return {
        ...state,
        [action.type]: action.payload,
        [billingField]: action.payload,
      };
    };
  }, []);

  const [formValues, dispatcher] = useReducer(
    reducer,
    checkout || initialFormValues
  );
  console.log("formValues", formValues);

  const currentFieldId = useRef("");
  const currentFieldName = useRef("");
  const formValuesRef = useRef(initialFormValues);
  const billingAddrEqShippingRef = useRef(true);

  const onValueChange = useMemo(
    () =>
      function (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        currentFieldId.current = evt.target.id;
        currentFieldName.current = evt.target.name;

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
  const [modeUpdate, setModeUpdate] = useState(true);

  const errorsRef = useRef(errors);

  useEffect(() => {
    async function initShippingCountry() {
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
    initShippingCountry();
  }, []);

  useEffect(() => {
    if (checkout && preValidationOk) {
      if (currentFieldName.current === "shipping_rate_id") {
        console.log("ttttttttt00000");
        setModeUpdate(true);
        return;
      }
      setModeUpdate(false);
    }
    // these props will come again to re-render upon refresh
  }, [checkout, preValidationOk]);

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

  const checkoutUpdateOrInsert = useMemo(
    () =>
      async function () {
        setPending(true);

        const res = await checkoutUpdateOrInsertAction(formValuesRef.current);

        setPending(false);

        function revealBillingFieldErrors(
          errors: {
            field: string;
            errormsg: string;
          }[]
        ) {
          const pos = errors.findIndex(
            (err) => err.field.indexOf("cust_billing_") > -1
          );

          if (pos > -1) {
            // reveal billing fields if they happen to have errors
            setBillingAddrEqShipping(false);
          }
        }

        if (res.errors.length) {
          const pos = res.errors.findIndex((err) => err.field === "checkout");
          if (pos > -1) {
            toast(res.errors[pos].errormsg);

            const filteredErrors = res.errors.filter(
              (err) => err.field !== "checkout"
            );

            if (filteredErrors.length) {
              // append "checkout" error object to filteredErrors
              filteredErrors.push({ ...res.errors[pos] });
              setErrors(filteredErrors);
              revealBillingFieldErrors(filteredErrors);
            } else {
              setErrors([{ ...res.errors[pos] }]);
            }
          } else {
            setErrors(res.errors);
            revealBillingFieldErrors(res.errors);
          }

          return -1;
        }

        setErrors([]);
        return 0;
      },
    []
  );

  const formActionCheckoutUpdateOrInsert = useMemo(
    () =>
      async function () {
        const rc = await checkoutUpdateOrInsert();

        if (rc < 0) {
          return;
        }

        router.refresh();

        // handlePayment();
        // if (checkout && preValidationOk) {
        //   handlePayment();
        // } else {
        //   router.refresh();
        // }
      },
    []
  );

  formValuesRef.current = formValues;
  errorsRef.current = errors;
  billingAddrEqShippingRef.current = billingAddrEqShipping;

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

  // const hostedFieldsRef = useRef<HostedFields | null>(null);
  //
  // useEffect(() => {
  //   async function initializeBraintree() {
  //     try {
  //       const res = await getBraintreeClientTokenAction();
  //
  //       if (res.error) {
  //         toast(res.error);
  //         return;
  //       }
  //
  //       const clientInstance = await braintree.client.create({
  //         authorization: res.clientToken,
  //       });
  //
  //       const hostedFields = await braintree.hostedFields.create({
  //         fields: {
  //           number: {
  //             selector: "#hosted-field-number",
  //             placeholder: "4111 1111 1111 1111",
  //           },
  //           ...(process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT ===
  //             "Production" && {
  //             cvv: {
  //               selector: "#hosted-field-cvv",
  //               placeholder: "123",
  //             },
  //           }),
  //           expirationDate: {
  //             selector: "#hosted-field-expiration-date",
  //             placeholder: "Expiration",
  //           },
  //         },
  //         client: clientInstance,
  //       });
  //       hostedFieldsRef.current = hostedFields;
  //     } catch (err) {
  //       console.log(err);
  //       toast("Unexpected error while processing checkout");
  //     }
  //   }
  //   initializeBraintree();
  // }, []);

  // const handlePayment = useMemo(
  //   () =>
  //     async function () {
  //       if (!hostedFieldsRef.current) return;
  //
  //       try {
  //         const { nonce } = await hostedFieldsRef.current.tokenize();
  //
  //         const res = await braintreeMakePaymentAction(nonce);
  //
  //         if (!res.ok) {
  //           toast(res.message);
  //           return;
  //         }
  //         // todo
  //         // Congratulations!
  //         // Your checkout was successful.
  //         // An acknowledgement email for your placed order has been sent to following email address
  //         //   youremail@yahoo.com
  //         // Please take note of the following.
  //         //   Notification of changes in the progress of your order's shipment status will be sent to above email address.
  //       } catch (err) {
  //         console.log(err);
  //         toast("Unexpected error while processing checkout!");
  //       }
  //     },
  //   []
  // );

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
        disabled={!modeUpdate}
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
      <input
        type="text"
        name="cust_shipping_state"
        id="cust_shipping_state"
        placeholder="cust_shipping_state"
        value={formValues.cust_shipping_state}
        onChange={onValueChange}
      />
      {getFieldError("cust_shipping_state") ? (
        <span>{getFieldError("cust_shipping_state")}</span>
      ) : null}
      <select
        name="cust_shipping_country"
        id="cust_shipping_country"
        value={formValues.cust_shipping_country}
        onChange={onValueChange}
      >
        <option value=""></option>
        {Object.entries(countrylist).map((keyVal) => (
          <option value={keyVal[0]} key={keyVal[0]}>
            {keyVal[0]} &nbsp;{keyVal[1]}
          </option>
        ))}
      </select>
      {getFieldError("cust_shipping_country") ? (
        <span>{getFieldError("cust_shipping_country")}</span>
      ) : null}
      {getFieldError("shipping_rate_id") ? (
        <span>{getFieldError("shipping_rate_id")}</span>
      ) : null}
      <fieldset disabled={!modeUpdate}>
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
            className="Checkout__label-for-shipping-rate-id"
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
            className="Checkout__label-for-shipping-rate-id"
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
      <fieldset
        disabled={!modeUpdate}
        className={`bg-warning Checkout__fieldset-billing-address${
          billingAddrEqShipping ? " billingAddrEqShipping" : ""
        }`}
      >
        <legend>Billing address</legend>
        <input
          type="text"
          name="cust_billing_fullname"
          id="cust_billing_fullname"
          placeholder="cust_billing_fullname"
          value={formValues.cust_billing_fullname}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_fullname") ? (
          <span>{getFieldError("cust_billing_fullname")}</span>
        ) : null}
        <input
          type="text"
          name="cust_billing_address"
          id="cust_billing_address"
          placeholder="cust_billing_address"
          value={formValues.cust_billing_address}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_address") ? (
          <span>{getFieldError("cust_billing_address")}</span>
        ) : null}
        <input
          type="text"
          name="cust_billing_postalcode"
          id="cust_billing_postalcode"
          placeholder="cust_billing_postalcode"
          value={formValues.cust_billing_postalcode}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_postalcode") ? (
          <span>{getFieldError("cust_billing_postalcode")}</span>
        ) : null}
        <input
          type="text"
          name="cust_billing_city"
          id="cust_billing_city"
          placeholder="cust_billing_city"
          value={formValues.cust_billing_city}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_city") ? (
          <span>{getFieldError("cust_billing_city")}</span>
        ) : null}
        <input
          type="text"
          name="cust_billing_state"
          id="cust_billing_state"
          placeholder="cust_billing_state"
          value={formValues.cust_billing_state}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_state") ? (
          <span>{getFieldError("cust_billing_state")}</span>
        ) : null}
        <select
          name="cust_billing_country"
          id="cust_billing_country"
          value={formValues.cust_billing_country}
          onChange={onValueChange}
        >
          <option value=""></option>
          {Object.entries(countrylist).map((keyVal) => (
            <option value={keyVal[0]} key={keyVal[0]}>
              {keyVal[0]} &nbsp;{keyVal[1]}
            </option>
          ))}
        </select>
        {getFieldError("cust_billing_country") ? (
          <span>{getFieldError("cust_billing_country")}</span>
        ) : null}
        <input
          type="text"
          name="cust_billing_phone"
          id="cust_billing_phone"
          placeholder="cust_billing_phone"
          value={formValues.cust_billing_phone}
          onChange={onValueChange}
        />
        {getFieldError("cust_billing_phone") ? (
          <span>{getFieldError("cust_billing_phone")}</span>
        ) : null}
      </fieldset>

      {/* <div>
        <div className="form-group">
          <label className="control-label" htmlFor="hosted-field-number">
            Credit Card Number
          </label>
          <div id="hosted-field-number"></div>
        </div>
        {process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT === "Production" && (
          <div className="form-group">
            <label className="control-label" htmlFor="hosted-field-cvv">
              CVV
            </label>
            <div id="hosted-field-cvv"></div>
          </div>
        )}
        <div className="form-group">
          <label
            className="control-label"
            htmlFor="hosted-field-expiration-date"
          >
            Expiration Date
          </label>
          <div id="hosted-field-expiration-date"></div>
        </div>
      </div> */}
      <br />
      {getFieldError("checkout") ? (
        <span>{getFieldError("checkout")}</span>
      ) : null}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          modeUpdate ? formActionCheckoutUpdateOrInsert() : setModeUpdate(true)
        }
      >
        {modeUpdate ? "Update Shipping/Billing" : "Edit Shipping/Billing"}
      </button>
      {/* <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p>
      <p style={{ background: "lightgray", padding: 0, margin: 0 }}>
        Me cart page
      </p> */}
      <div
        className={`${
          pending ? "d-block" : "d-none"
        } position-absolute top-0 bottom-0 start-0 end-0 bg-dark opacity-25`}
      ></div>
    </form>
  );
}
