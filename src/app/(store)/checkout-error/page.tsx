import YnsLink from "@/ui/yns-link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CheckoutErrorPage(props: {
  searchParams: SearchParams;
}) {
  const { error } = await props.searchParams;

  return (
    <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-white z-1 d-flex align-items-center justify-content-center flex-column">
      <h2 className="h2">Error while processing payment</h2>
      <br />
      <br />
      <h4 className="h4">{error}</h4>
      <br />
      <YnsLink href="/">Back to shopping</YnsLink>
    </div>
  );
}
