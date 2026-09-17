import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Root & Health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Status API & Petunjuk Penggunaan' })
  getRoot() {
    return {
      status: true,
      statusCode: 200,
      message: 'Berhasil memproses permintaan',
      data: {
        name: 'Coworking Space Backend API - UKK RPL Paket B',
        version: '1.0.0',
        status: 'online',
        swagger_docs: '/docs',
        description:
          'Backend service untuk menunjang kelas frontend dalam ujian UKK.',
        documentation_links: {
          swagger: 'http://localhost:3000/docs',
          swagger_json: 'http://localhost:3000/docs-json',
        },
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('push-db')
  @ApiOperation({ summary: 'Force sync database' })
  pushDb() {
    const { execSync } = require('child_process');
    try {
      // Menambahkan env CI=1 agar tidak ada prompt interaktif
      const result = execSync('npx prisma db push --accept-data-loss', {
        env: { ...process.env, CI: '1', PRISMA_HIDE_UPDATE_MESSAGE: '1' }
      }).toString();
      return {
        status: true,
        message: 'Database synced successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Failed to sync database',
        data: error.message,
      };
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Check Server' })
  getHealth() {
    return {
      status: true,
      statusCode: 200,
      message: 'Berhasil memproses permintaan',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }
}
