export interface SignUpDTO {
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
}
export interface SignInDTO {
    email: string;
    password: string;
}
/**
 * Registers a new user with hashed password
 */
declare const signUpUser: (data: SignUpDTO) => Promise<{
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Authenticates user and generates JWT token
 */
declare const signInUser: (data: SignInDTO) => Promise<{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
export declare const AuthService: {
    signUpUser: typeof signUpUser;
    signInUser: typeof signInUser;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map