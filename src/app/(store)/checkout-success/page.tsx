import YnsLink from "@/ui/yns-link";
import ClearYnsCartCookie from "@/ui/checkout/clear-yns-cart-cookie";
import ToastClient from "@/ui/checkout/toast-client";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CheckoutSuccessPage(props: {
  searchParams: SearchParams;
}) {
  const { cust_email, dberror } = await props.searchParams;

  return (
    <>
      <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-white z-1 d-flex align-items-center justify-content-center flex-column px-5">
        <h2 className="h2">Checkout successful</h2>
        <br />
        <br />
        <h4 className="h4">Thank you for shopping!</h4>
        <br />
        <p>
          An email acknowledging your purchase has been sent to the below email
          address
        </p>
        <p className="text-info">{cust_email}</p>
        <br />
        <p>
          You may refer to the link enclosed in the email to keep track of
          shipment progress
        </p>
        <YnsLink href="/">Back to shopping</YnsLink>
      </div>
      <ClearYnsCartCookie />
      {dberror ? <ToastClient msg={dberror as string} /> : null}
    </>
  );
}
