/**
 * Extracts a clean human-readable error message from an Axios error.
 * Checks the API response body first, then falls back to the Axios message.
 */
export const extractApiError = (error: any, fallback = "Something went wrong"): string => {
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallback;
};
