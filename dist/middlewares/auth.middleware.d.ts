import type { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        name?: string;
        email?: string;
        avatarUrl?: string | null;
    };
}
/**
 * Middleware to verify JWT token and populate req.user
 */
export declare const authenticateUser: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map