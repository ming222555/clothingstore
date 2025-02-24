import YnsLink from "@/ui/yns-link";

export default function NotFoundPage() {
  return (
    <main className="position-fixed top-0 start-0 bottom-0 end-0 bg-white z-1 d-flex align-items-center justify-content-center flex-column">
      <h1 className="h2">Not found</h1>
      <p>The resource or page you were looking for does not exist</p>
      <YnsLink href="/">Back to Home</YnsLink>
    </main>
  );
}
