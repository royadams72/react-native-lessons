export async function fetchApi<TInput, TOutput>(
  url: string,
  mapFunc: (data: TInput) => TOutput,
): Promise<TOutput | null> {
  // await new Promise<void>((resolve) => {
  //   setTimeout(resolve, 1000);
  // });

  const res = await fetch(url, {
    cache: "no-store",
  });
  // This initial check is for the not-found.tsx, however not all APIs return 404
  if (res.status === 404) {
    return null;
  }

  // This is for the error.tsx
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  // This second check is for the not-found.tsx, the API I'm working with returns 200 with empty body so...
  // read the body.text() string, if empty it return null/undefined
  const text = await res.text();

  if (!text || text.trim() === "null") {
    return null;
  }
  // Use JSON.parse to convert to object
  const data: TInput = JSON.parse(text);

  return mapFunc(data);
}
