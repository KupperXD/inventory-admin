export namespace Form {
    export type TFieldWithError = {
        error: string;
    };

    export type TBaseField<ValueType = string> = {
        name: string;
        value: ValueType | null;
        label: string;
        type?: 'text' | 'password';
        error: string;
    };

    export type TOption<ValueType = string> = {
        value: ValueType;
        label: string;
    };

    export type TSelectSingleField<ValueType = string> =
        TBaseField<ValueType> & {
            options: TOption<ValueType>[];
        };
}
