export type ApiError = {
    code: number;
    data: string | ApiValidationError[];
};

export type ApiValidationError = {
    errors: Record<string, string>;
    properties: string;
    nested: ApiValidationError[];
};

export type ApiErrorResponse = {
    error: ApiError;
};
