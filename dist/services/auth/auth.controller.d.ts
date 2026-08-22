import type { Request, Response } from 'express';
declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const signIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AuthController: {
    signUp: typeof signUp;
    signIn: typeof signIn;
};
export {};
//# sourceMappingURL=auth.controller.d.ts.map