export const httpResponse = (
  statusCode: number,
  message: string,
  error?: string,
) => {
  return {
    statusCode: statusCode,
    message: message,
    error: error,
  };
};
