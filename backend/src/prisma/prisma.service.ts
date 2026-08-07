import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const connectionString = process.env.DATABASE_URL;
        // Sans ça l'adapter retombe sur les défauts libpq et se connecte à une base au hasard.
        if (!connectionString) {
            throw new Error('DATABASE_URL is not set');
        }
        super({ adapter: new PrismaPg({ connectionString }) });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
