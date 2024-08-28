export class ApiError extends Error {
  message: string;
  code: number;

  constructor(code: number, message: string) {
    super(message);

    this.message = message;
    this.code = code;
  }
}

export const $error = (code: number, message: string): ApiError => {
  return new ApiError(code, message);
};
