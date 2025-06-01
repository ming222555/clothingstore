import YnsLink from "@/ui/yns-link";

export default function NotFoundPage() {
  return (
    <main className="fixed top-0 left-0 bottom-0 right-0 bg-white z-1 flex items-center justify-center flex-col">
      <h1 className="h2">Not found</h1>
      <p>The resource or page you were looking for does not exist</p>
      <br />
      <br />
      <YnsLink href="/" className="underline text-blue-500">
        Back to Home
      </YnsLink>
    </main>
  );
}
