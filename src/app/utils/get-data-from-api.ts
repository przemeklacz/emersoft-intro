
export async function getDataFromApi(url: URL, searchParams: {
  [key: string]: string | string[] | undefined;
} = {}) {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}