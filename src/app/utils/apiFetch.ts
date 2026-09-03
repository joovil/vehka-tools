export const apiFetch = async (
  endpoint: RequestInfo | URL,
  options?: RequestInit,
): Promise<Response> => {
  // Only called from the browser, so a relative path is enough and avoids
  // depending on a per-environment base URL.
  const res = await fetch(`/api${endpoint}`, options);
  return res;
};
