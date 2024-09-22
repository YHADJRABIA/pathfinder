import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    );
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else if (typeof error === "object" && error !== null) {
    if ("message" in error) {
      return (error as { message?: string }).message || "Unknown error";
    }
  }

  return "An unexpected error occurred";
};
