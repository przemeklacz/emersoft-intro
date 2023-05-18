import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParams = (obj: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (let key in obj) {
      if (obj[key] === "") {
        params.delete(key);
      } else {
        params.set(key, obj[key]);
      }
    }
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`);
  };

  return { queryParam: searchParams, setQueryParams };
};
