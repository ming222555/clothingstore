import YnsLink from "@/ui/yns-link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CheckoutErrorPage(props: {
  searchParams: SearchParams;
}) {
  const { error } = await props.searchParams;

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-white z-1 flex items-center justify-center flex-col">
      <h2 className="h2">Error while processing payment</h2>
      <br />
      <br />
      <h4 className="h4">{error}</h4>
      <br />
      <YnsLink href="/">Back to shopping</YnsLink>
    </div>
  );
}
