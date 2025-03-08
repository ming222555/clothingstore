"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import dropin from "braintree-web-drop-in";
import { toast } from "sonner";

import { braintreeMakePaymentAction } from "@/actions/braintree-actions";

export default function BraintreeDropIn({
  show,
  processingPayment,
  setProcessingPayment,
  custEmail,
}: {
  show: boolean;
  processingPayment: boolean;
  setProcessingPayment: (processingPayment: boolean) => void;
  custEmail: string;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<
    dropin.Dropin | undefined
  >(undefined);

  const makePayment = useMemo(() => {
    return async function (nonce: string) {
      braintreeMakePaymentAction(nonce, custEmail);
    };
  }, [custEmail]);

  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: "sandbox_w3tgcc3y_48sxsf8xxnxgcn8q",
            container: "#braintree-drop-in-div",
            paymentOptionPriority: ["card"],
            card: {
              overrides: {
                fields: {
                  number: {
                    placeholder: "4111 1111 1111 1111", // Update the number field placeholder
                  },
                  cvv: {
                    maskInput: true,
                  },
                },
              },
              cardholderName: {
                required: true,
              },
            },
          },
          function (error, instance) {
            if (error) {
              console.error(error);
              return;
            }
            setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  const braintreeInstanceRef = useRef<dropin.Dropin | undefined>(
    braintreeInstance
  );
  braintreeInstanceRef.current = braintreeInstance;

  useEffect(() => {
    if (braintreeInstanceRef.current) {
      braintreeInstanceRef.current.teardown().then(() => {});
    }
  }, []);

  return (
    <div className={`pb-5${show ? " d-block" : " d-none"}`}>
      <div id={"braintree-drop-in-div"} />

      {braintreeInstance ? null : (
        <p className="h5 fst-italic text-primary mt-3">
          Please wait, loading payment form...
        </p>
      )}

      {processingPayment ? (
        <p className="h5 fst-italic text-primary my-3">
          Please wait, payment in progess...
        </p>
      ) : null}

      <button
        type="button"
        style={{ display: braintreeInstance ? "inline-block" : "none" }}
        className={`btn btn-dark rounded-pill w-100${
          !braintreeInstance || processingPayment ? " cursor-wait" : ""
        }`}
        // disabled={!braintreeInstance || processingPayment}
        onClick={() => {
          if (!braintreeInstance || processingPayment) {
            return;
          }
          if (braintreeInstance) {
            setProcessingPayment(true);
            braintreeInstance.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error(error);
                toast((error as Error).message); // e.g. Invalid card number
                setProcessingPayment(false);
              } else {
                makePayment(payload.nonce);
              }
            });
          }
        }}
      >
        Pay
      </button>
    </div>
  );
}
