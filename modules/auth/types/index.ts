export namespace Auth {
    export type TLoginRequest = {
        username: string | null;
        password: string | null;
    };

    export type TLoginResponse = {
        success: boolean;
        user: string;
        token: string;
    };

    export type TUser = {
        user: string;
    };
}
