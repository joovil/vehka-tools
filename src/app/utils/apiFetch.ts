export const apiFetch = async (
  endpoint: RequestInfo | URL,
  options?: RequestInit,
): Promise<Response> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}`,
    options,
  );
  return res;
};
