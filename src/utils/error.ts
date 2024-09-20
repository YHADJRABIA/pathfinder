export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === "string") {
    return error
  } else if (typeof error === "object" && error !== null) {
    if ("message" in error) {
      return (error as { message?: string }).message || "Unknown error"
    }
  }

  // Fallback for any other case
  return "An unexpected error occurred"
}
