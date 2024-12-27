import YnsLink from "@/ui/yns-link";

export default function NotFoundPage() {
  return (
    <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light">
      <div className="text-center">
        <h1>Not found</h1>
        <p>The page you were looking for does not exist.</p>
        <YnsLink href="/">Go back home</YnsLink>
      </div>
    </div>
  );
}
