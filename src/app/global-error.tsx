"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2 className="h2">An unexpected error has occurred</h2>
        <p>{error.message}</p>
        {(error.digest || error.stack) && (
          <details>
            <summary>More Details</summary>
            {error.digest && <p>{error.digest}</p>}
            {error.stack && <pre>{error.stack}</pre>}
          </details>
        )}
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
