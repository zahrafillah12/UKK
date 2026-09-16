import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as mariadb from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = new URL(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/ukk_db');
    const pool = mariadb.createPool({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
    });
    const adapter = new PrismaMariaDb(pool as any);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
