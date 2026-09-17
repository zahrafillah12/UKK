import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/ukk_db',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
