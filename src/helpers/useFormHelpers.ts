import {ApiErrorResponse, ApiValidationError} from "~/src/types/errors";
import {transformApiError} from "~/src/utils/errors";
import {BaseResponse} from "~/src/types";

export function useFormHelpers() {
    const isError = (response: BaseResponse<unknown> | ApiErrorResponse): response is ApiErrorResponse => {
        return typeof ((response as ApiErrorResponse).error) !== 'undefined';
    }

    const resetErrors = (fields: {error: string | null}[]) => {
        fields.forEach(field => field.error = '');
    };

    const setFormErrors = (formFields: {error: string | null, name: string}[], entryErrors: ApiValidationError[]) => {
        const transformedErrors = transformApiError(entryErrors);

        formFields.forEach((field) => {
            if (transformedErrors[field.name] === 'undefined') {
                return;
            }

            field.error = transformedErrors[field.name];
        });
    };

    return {
        resetErrors,
        setFormErrors,
        isError,
    }
}
