import app from './app.js';
import { prisma } from './lib/prisma.js';
// Adjust import path to your prisma instance
const PORT = process.env.PORT || 4000;
async function main() {
    try {
        // Optionally verify connection on startup
        await prisma.$connect();
        console.log('✅ Connected to PostgreSQL via Prisma');
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
        // --- Graceful Shutdown Handler ---
        const shutdown = async (signal) => {
            console.log(`\n${signal} received. Closing HTTP server and database connections...`);
            server.close(async () => {
                console.log('HTTP server closed.');
                await prisma.$disconnect();
                console.log('Prisma disconnected.');
                process.exit(0);
            });
            // Force exit if shutdown hangs for over 10s
            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down.');
                process.exit(1);
            }, 10000);
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map