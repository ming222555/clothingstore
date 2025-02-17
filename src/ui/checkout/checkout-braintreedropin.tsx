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
                    placeholder: "1234 1234 1234 1234", // Update the number field placeholder
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

      <button
        type="button"
        disabled={!braintreeInstance || processingPayment}
        onClick={() => {
          if (braintreeInstance) {
            setProcessingPayment(true);
            braintreeInstance.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error(error);
                toast((error as Error).message); // e.g. Invalid card number
                setProcessingPayment(false);
              } else {
                console.log(`Payment payload`, payload);
                console.log("payment method nonce", payload.nonce);

                makePayment(payload.nonce);
              }
            });
          }
        }}
      >
        {"Pay"}
      </button>
    </div>
  );
}
