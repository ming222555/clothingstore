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
    <main className="fixed top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center flex-col">
      <h1 className="h2">An unexpected error has occurred</h1>
      <a href="http://localhost:3000/">Back to Home</a>
    </main>
  );
}
