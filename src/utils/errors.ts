import {ApiValidationError} from "~/src/types/errors";

export const transformApiError = (errors: ApiValidationError[]): Record<string, string> => {
    const reduceErrors = (errors: ApiValidationError[], previusResult: Record<string, string>): Record<string, string> => {
        errors.forEach((error) => {
            if (!error.errors) {
                return;
            }

            previusResult[error.properties] = Object.values(error.errors).join(', ')

            if (!error.nested) {
                return;
            }

            reduceErrors(error.nested, previusResult);
        });

        return previusResult;
    };

    return reduceErrors(errors, {});
};
