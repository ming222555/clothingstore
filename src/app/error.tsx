"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="position-fixed top-0 start-0 bottom-0 end-0 bg-white d-flex align-items-center justify-content-center flex-column">
      <h1 className="h2">An unexpected error has occurred</h1>
      <a href="http://localhost:3000/">Back to Home</a>
    </main>
  );
}
