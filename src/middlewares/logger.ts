import type { Request, Response, NextFunction } from 'express';

import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';
// Using the colorizer [citation:1]
// import { infoLog, successLog, errorLog } from '@vmvaytk/inklog'; // Alternative



// Your custom logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // This middleware only runs in development
    const formatObject = (obj: any, keyColor: string = 'white', valueColor: string = 'green'): string => {
        if (!obj || typeof obj !== 'object') {
            return String(obj);
        }

        const entries = Object.entries(obj);
        if (entries.length === 0) return '{}';

        const formatted = entries.map(([key, value]) => {
            const coloredKey = (color as any)[keyColor](key);
            const coloredValue = (color as any)[valueColor](JSON.stringify(value));
            return `  ${coloredKey}: ${coloredValue}`;
        });

        return `{\n${formatted.join(',\n')}\n}`;
    };
    if (process.env.NODE_ENV === 'development') {
        const logDetails = {
            'Route': `${req.method} ${req.url}`,
            'Params': req.params,
            'Query': req.query,
            'Body': req.body,
            'Cookies': req.cookies,
            'Authorization': req.headers.authorization || 'None'
        };
        console.log(cyan('=================== INCOMING REQUEST ==============='));
        // console.table(logDetails);
        console.log(color.blue(`Route: ${req.method} ${req.url}`));
        console.log(color.yellow(`Params: ${JSON.stringify(req.params)}`));
        console.log(color.red(`Query: ${JSON.stringify(req.query)}`));
        // console.log(color.green(`Body: ${JSON.stringify(req.body)}`));
        console.log(color.blueBright(`Cookies: ${JSON.stringify(req.cookies)}`));
        console.log(color.yellowBright(`Authorization: ${req.headers.authorization || 'None'}`));
        console.log(color.green(`Body: ${formatObject(req.body, 'green', 'yellow')}`));




        console.log(cyan('==========================================='));
    }
    next();
};
