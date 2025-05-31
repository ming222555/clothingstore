"use client";

import { useMemo, useReducer, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ip3country from "ip3country";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BraintreeDropIn from "./checkout-braintreedropin";
import countrylist from "@/dat/countries.json";
import { formatMoney } from "@/lib/utils/utils";

ip3country.init();

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
  shippingRates,
}: {
  checkout: Commerce.Checkout | null;
  preValidationOk: boolean | null;
  shippingRates: {
    id: string;
    rate: number;
    rate_currency: string;
    agency: string;
    duration: string;
  }[];
}) {
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

  const currentFieldId = useRef("");
  const isShippingRateLastFieldChangedPriorUpdate = useRef<true | null>(null);
  const formValuesRef = useRef(initialFormValues);
  const billingAddrEqShippingRef = useRef(true);

  const onValueChange = useMemo(
    () =>
      function (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        currentFieldId.current = evt.target.id;

        if (evt.target.name === "shipping_rate_id") {
          // radio button
          const pos = errorsRef.current.findIndex(
            (err) =>
              err.field === "shipping_rate_id" &&
              err.errormsg.includes("Please select") // "Please select Shipping method"
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
  const [processingPayment, setProcessingPayment] = useState(false);

  const [updatePaymentDisabled, setUpdatePaymentDisabled] = useState(true);

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

        const pos = countrylist.findIndex((ctry) => ctry.code === countryCode);

        if (pos < 0) {
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
    setUpdatePaymentDisabled(false);
  }, []);

  useEffect(() => {
    if (checkout && preValidationOk) {
      if (isShippingRateLastFieldChangedPriorUpdate.current) {
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
        isShippingRateLastFieldChangedPriorUpdate.current = true;

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
        // reset
        isShippingRateLastFieldChangedPriorUpdate.current = null;

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

  return (
    <>
      <p className="text-sm text-gray-500 mt-1 mb-5 ps-3">
        Provide billing and shipping details below.
      </p>
      <form className="relative ps-3 mb-20">
        <div className="mb-3">
          <label htmlFor="cust_email" className="mb-1">
            Email{" "}
            <span id="emailHelp" className="text-sm text-red-500 ps-1">
              {getFieldError("cust_email") ? getFieldError("cust_email") : null}
            </span>
          </label>
          <Input
            type="text"
            inputMode="email"
            name="cust_email"
            id="cust_email"
            placeholder="you@example.com"
            value={formValues.cust_email}
            onChange={onValueChange}
            disabled={!modeUpdate || pending}
            className={`block ${
              getFieldError("cust_email") ? "border-red-500" : ""
            }`}
            aria-describedby="emailHelp"
          />
        </div>
        <fieldset
          className="border rounded-xl px-3"
          disabled={!modeUpdate || pending}
        >
          <legend className="h6">Shipping</legend>
          <div className="mb-3">
            <label htmlFor="cust_shipping_fullname" className="mb-1">
              Full name{" "}
              <span
                id="custShippingFullnameHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_shipping_fullname")
                  ? getFieldError("cust_shipping_fullname")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_shipping_fullname"
              id="cust_shipping_fullname"
              value={formValues.cust_shipping_fullname}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_shipping_fullname") ? "border-red-500" : ""
              }`}
              aria-describedby="custShippingFullnameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cust_shipping_address" className="mb-1">
              Address{" "}
              <span
                id="custShippingAddressHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_shipping_address")
                  ? getFieldError("cust_shipping_address")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_shipping_address"
              id="cust_shipping_address"
              value={formValues.cust_shipping_address}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_shipping_address") ? "border-red-500" : ""
              }`}
              aria-describedby="custShippingAddressHelp"
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-3 w-[45%]">
              <label htmlFor="cust_shipping_postalcode" className="mb-1">
                Postal Code{" "}
                <p
                  id="custShippingPostalCodeHelp"
                  className="text-sm text-red-500 my-0"
                >
                  {getFieldError("cust_shipping_postalcode")
                    ? getFieldError("cust_shipping_postalcode")
                    : null}
                </p>
              </label>
              <Input
                type="text"
                name="cust_shipping_postalcode"
                id="cust_shipping_postalcode"
                value={formValues.cust_shipping_postalcode}
                onChange={onValueChange}
                className={`block ${
                  getFieldError("cust_shipping_postalcode")
                    ? "border-red-500"
                    : ""
                }`}
                aria-describedby="custShippingPostalCodeHelp"
              />
            </div>
            <div className="mb-3 w-[45%]">
              <label htmlFor="cust_shipping_city" className="mb-1">
                City{" "}
                <span
                  id="custShippingCityCodeHelp"
                  className="text-sm text-red-500 ps-1"
                >
                  {getFieldError("cust_shipping_city")
                    ? getFieldError("cust_shipping_city")
                    : null}
                </span>
              </label>
              <Input
                type="text"
                name="cust_shipping_city"
                id="cust_shipping_city"
                value={formValues.cust_shipping_city}
                onChange={onValueChange}
                className={`block ${
                  getFieldError("cust_shipping_city") ? "border-red-500" : ""
                }`}
                aria-describedby="custShippingCityCodeHelp"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cust_shipping_state" className="mb-1">
              State / Region{" "}
              <span
                id="custShippingStateHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_shipping_state")
                  ? getFieldError("cust_shipping_state")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_shipping_state"
              id="cust_shipping_state"
              value={formValues.cust_shipping_state}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_shipping_state") ? "border-red-500" : ""
              }`}
              aria-describedby="custShippingStateHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cust_shipping_country" className="mb-1">
              Country{" "}
              <span
                id="custShippingCountryHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_shipping_country")
                  ? getFieldError("cust_shipping_country")
                  : null}
              </span>
            </label>
            <select
              name="cust_shipping_country"
              id="cust_shipping_country"
              value={formValues.cust_shipping_country}
              onChange={onValueChange}
              className={`py-1 border border-input rounded-md ${
                getFieldError("cust_shipping_country") ? "border-red-500" : ""
              }`}
              aria-describedby="custShippingCountryHelp"
            >
              <option value=""></option>
              {countrylist.map((ctry) => (
                <option value={ctry.code} key={ctry.code}>
                  {ctry.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="mt-3" disabled={!modeUpdate || pending}>
          {getFieldError("shipping_rate_id") ? (
            <span className="text-sm text-red-500">
              {getFieldError("shipping_rate_id")}
            </span>
          ) : null}
          <legend className="h6 pt-2">Shipping method</legend>
          <div
            className={`grid grid-cols-3 gap-x-3 gap-y-1 mb-3 ${
              pendingShippingRate ? "cursor-wait" : ""
            }`}
          >
            {shippingRates.map((sr) => (
              <div className="mb-2" key={sr.id}>
                <label
                  htmlFor={`${sr.id}`}
                  className={`flex flex-col border-1 rounded-xl ${
                    formValues.shipping_rate_id === sr.id ? "border-black" : ""
                  }${pendingShippingRate ? " cursor-wait" : ""}`}
                  role="button"
                >
                  <input
                    type="radio"
                    name="shipping_rate_id"
                    value={`${sr.id}`}
                    checked={formValues.shipping_rate_id === `${sr.id}`}
                    onChange={(evt) => {
                      onValueChange(evt);
                      formActionCheckoutUpdateOrInsertShippingRate(evt);
                    }}
                    disabled={pending}
                    id={`${sr.id}`}
                    className="hidden"
                  />
                  <span className="h6 mb-0">{`${sr.id}`}</span>
                  <span className="text-sm text-gray-500">{`${sr.duration}`}</span>
                  <span className="h5">{`${formatMoney(
                    sr.rate,
                    sr.rate_currency
                  )}`}</span>
                </label>
              </div>
            ))}
          </div>
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
            className="ps-2 text-gray-500"
          >
            Billing address same as shipping
          </label>
        </fieldset>
        <fieldset
          className={`max-h-[999px] transition-all delay-200 overflow-hidden [&.hide]:max-h-0 mt-3 rounded-xl border-1 px-3 ${
            billingAddrEqShipping ? "hide" : ""
          }`}
          disabled={!modeUpdate || pending}
        >
          <legend className="h6">
            {`${billingAddrEqShipping ? "" : "Billing address"}`}
          </legend>
          <div className="mb-3">
            <label htmlFor="cust_billing_fullname" className="mb-1">
              Full name{" "}
              <span
                id="custBillingFullnameHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_billing_fullname")
                  ? getFieldError("cust_billing_fullname")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_billing_fullname"
              id="cust_billing_fullname"
              value={formValues.cust_billing_fullname}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_billing_fullname") ? "border-red-500" : ""
              }`}
              aria-describedby="custBillingFullnameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cust_billing_address" className="mb-1">
              Address{" "}
              <span
                id="custBillingAddressHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_billing_address")
                  ? getFieldError("cust_billing_address")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_billing_address"
              id="cust_billing_address"
              value={formValues.cust_billing_address}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_billing_address") ? "border-red-500" : ""
              }`}
              aria-describedby="custBillingAddressHelp"
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-3 w-[45%]">
              <label htmlFor="cust_billing_postalcode" className="mb-1">
                Postal Code{" "}
                <p
                  id="custBillingPostalCodeHelp"
                  className="text-sm text-red-500 my-0"
                >
                  {getFieldError("cust_billing_postalcode")
                    ? getFieldError("cust_billing_postalcode")
                    : null}
                </p>
              </label>
              <Input
                type="text"
                name="cust_billing_postalcode"
                id="cust_billing_postalcode"
                value={formValues.cust_billing_postalcode}
                onChange={onValueChange}
                className={`block ${
                  getFieldError("cust_billing_postalcode")
                    ? "border-red-500"
                    : ""
                }`}
                aria-describedby="custBillingPostalCodeHelp"
              />
            </div>
            <div className="mb-3 w-[45%]">
              <label htmlFor="cust_billing_city" className="mb-1">
                City{" "}
                <span
                  id="custBillingCityCodeHelp"
                  className="text-sm text-red-500 ps-1"
                >
                  {getFieldError("cust_billing_city")
                    ? getFieldError("cust_billing_city")
                    : null}
                </span>
              </label>
              <Input
                type="text"
                name="cust_billing_city"
                id="cust_billing_city"
                value={formValues.cust_billing_city}
                onChange={onValueChange}
                className={`block ${
                  getFieldError("cust_billing_city") ? "border-red-500" : ""
                }`}
                aria-describedby="custBillingCityCodeHelp"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cust_billing_state" className="mb-1">
              State / Region{" "}
              <span
                id="custBillingStateHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_billing_state")
                  ? getFieldError("cust_billing_state")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_billing_state"
              id="cust_billing_state"
              value={formValues.cust_billing_state}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_billing_state") ? "border-red-500" : ""
              }`}
              aria-describedby="custBillingStateHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cust_billing_country" className="mb-1">
              Country{" "}
              <span
                id="custBillingCountryHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_billing_country")
                  ? getFieldError("cust_billing_country")
                  : null}
              </span>
            </label>
            <select
              name="cust_billing_country"
              id="cust_billing_country"
              value={formValues.cust_billing_country}
              onChange={onValueChange}
              // form-select form-select-sm
              className={`py-1 border border-input rounded-md ${
                getFieldError("cust_billing_country") ? "border-red-500" : ""
              }`}
              aria-describedby="custBillingCountryHelp"
            >
              <option value=""></option>
              {countrylist.map((ctry) => (
                <option value={ctry.code} key={ctry.code}>
                  {ctry.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cust_billing_phone" className="mb-1">
              Phone{" "}
              <span
                id="custBillingPhoneHelp"
                className="text-sm text-red-500 ps-1"
              >
                {getFieldError("cust_billing_phone")
                  ? getFieldError("cust_billing_phone")
                  : null}
              </span>
            </label>
            <Input
              type="text"
              name="cust_billing_phone"
              id="cust_billing_phone"
              value={formValues.cust_billing_phone}
              onChange={onValueChange}
              className={`block ${
                getFieldError("cust_billing_phone") ? "border-red-500" : ""
              }`}
              aria-describedby="custBillingPhoneHelp"
            />
          </div>
        </fieldset>
        <div
          className={`${
            getFieldError("checkout")
              ? "text-red-500 border border-red-500 rounded-xl ps-3 py-1 mt-3 flex flex-col"
              : "hidden"
          }`}
        >
          <span className="flex items-center">
            <span className="w-4">
              <svg
                fill="currentColor"
                // width="800px"
                // height="800px"
                viewBox="-2 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <path d="M5.094 16.32A8 8 0 0 0 16.32 5.094L5.094 16.32zM3.68 14.906L14.906 3.68A8 8 0 0 0 3.68 14.906zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </span>
            <span className="text-red-500 font-medium ps-2 text-sm">Error</span>
          </span>
          <span className="flex items-center">
            <span className="w-4"></span>
            <span className="text-red-500 ps-2 text-sm">
              {getFieldError("checkout") ? getFieldError("checkout") : null}
            </span>
          </span>
        </div>
        <div
          className={`${
            errors.length > 0 &&
            !(errors.length === 1 && errors[0].field === "checkout")
              ? "text-red-500 border border-red-500 ps-3 py-1 mt-3 flex flex-col"
              : "hidden"
          }`}
        >
          <span className="flex items-center">
            <span className="w-4">
              <svg
                fill="currentColor"
                // width="800px"
                // height="800px"
                viewBox="-2 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
              >
                <path d="M5.094 16.32A8 8 0 0 0 16.32 5.094L5.094 16.32zM3.68 14.906L14.906 3.68A8 8 0 0 0 3.68 14.906zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </span>
            <span className="text-red-500 font-medium ps-2 text-sm">Error</span>
          </span>
          <span className="flex items-center">
            <span className="w-4"></span>
            <span className="text-red-500 ps-2 text-sm">
              Please fill in the required fields with valid data.
            </span>
          </span>
        </div>
        <br />
        <Button
          type="button"
          role="button"
          size="lg"
          // disabled={updatePaymentDisabled || pending || processingPayment}
          className={`text-lg font-bold rounded-4xl w-full ${
            updatePaymentDisabled || pending || processingPayment
              ? " cursor-wait"
              : ""
          }`}
          onClick={() => {
            if (updatePaymentDisabled || pending || processingPayment) {
              return;
            }
            if (modeUpdate) {
              formActionCheckoutUpdateOrInsert();
            } else {
              setModeUpdate(true);
            }
          }}
        >
          {modeUpdate ? "Update Shipping/Billing" : "Edit Shipping/Billing"}
        </Button>
        <BraintreeDropIn
          show={modeUpdate ? false : true}
          processingPayment={processingPayment}
          setProcessingPayment={setProcessingPayment}
          custEmail={checkout?.cust_email || formValues.cust_email}
        />
      </form>
    </>
  );
}
