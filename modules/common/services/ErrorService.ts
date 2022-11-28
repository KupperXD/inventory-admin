import { TErrorMessage, TErrorResponse } from '~/modules/common/types';
import { Form } from '~/modules/form/types';

class ErrorService {
    /**
     * Эта ошибка валидации
     * @param err
     */
    public isErrorValidation(err: TErrorResponse): boolean {
        return typeof err.errors !== 'undefined';
    }

    /**
     * Очистить ошибки
     * @param fields
     */
    public clearErrors(fields: Form.TFieldWithError[]) {
        fields.forEach((field) => (field.error = ''));
    }

    /**
     * Установить ошибки валидации
     * @param fields
     * @param errors
     */
    public setErrors(
        fields: Form.TBaseField<unknown>[],
        errors: TErrorMessage
    ) {
        console.log('set errors');
        if (Array.isArray(errors)) {
            return;
        }
        fields.forEach((field) => {
            const key = field.name;
            if (typeof errors[key] !== 'undefined') {
                const message = errors[key];
                field.error = Array.isArray(message)
                    ? message.join(', ')
                    : message;
            }
        });
    }
}

const errorService = new ErrorService();

export default errorService;
