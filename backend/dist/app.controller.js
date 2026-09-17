"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
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
                description: 'Backend service untuk menunjang kelas frontend dalam ujian UKK.',
                documentation_links: {
                    swagger: 'http://localhost:3000/docs',
                    swagger_json: 'http://localhost:3000/docs-json',
                },
            },
            timestamp: new Date().toISOString(),
        };
    }
    pushDb() {
        const { execSync } = require('child_process');
        try {
            const result = execSync('npx prisma db push --accept-data-loss', {
                env: { ...process.env, CI: '1', PRISMA_HIDE_UPDATE_MESSAGE: '1' }
            }).toString();
            return {
                status: true,
                message: 'Database synced successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                status: false,
                message: 'Failed to sync database',
                data: error.message,
            };
        }
    }
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Status API & Petunjuk Penggunaan' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoot", null);
__decorate([
    (0, common_1.Get)('push-db'),
    (0, swagger_1.ApiOperation)({ summary: 'Force sync database' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "pushDb", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health Check Server' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Root & Health'),
    (0, common_1.Controller)('api')
], AppController);
//# sourceMappingURL=app.controller.js.map