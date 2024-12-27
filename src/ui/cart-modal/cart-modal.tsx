import YnsLink from "@/ui/yns-link";

export default function CartModal() {
  return (
    <>
      <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark opacity-50"></div>
      <div className="CartModal position-fixed top-0 bottom-0 start-100 bg-light">
        Me cart modal page <YnsLink href="/cart">(open full view)</YnsLink>
      </div>
    </>
  );
}
