import { PrismaClient } from '@prisma/client';
import env from '../../env/server.mjs';

export default new PrismaClient({
	log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});
