import YnsLink from "@/ui/yns-link";
import { Button } from "@/components/ui/button";

export async function CartEmpty() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-white z-1 flex items-center justify-center flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-y-2 text-center">
        <ShoppingCartIcon className="h-12 w-12 text-neutral-500" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-neutral-500">
          Looks like you haven&lsquo;t added anything to your cart yet.
        </p>
      </div>
      <YnsLink href="/">
        <Button
          type="button"
          role="button"
          size="lg"
          className="text-sm font-bold rounded-4xl"
        >
          Continue shopping
        </Button>
      </YnsLink>
    </div>
  );
}

function ShoppingCartIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
