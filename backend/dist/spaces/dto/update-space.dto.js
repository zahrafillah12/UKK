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
exports.UpdateSpaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateSpaceDto {
    nama_space;
    harga_per_jam;
    tipe;
    kapasitas;
    deskripsi;
    foto;
}
exports.UpdateSpaceDto = UpdateSpaceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Personal Desk Alpha 01 (Updated)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "nama_space", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 30000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSpaceDto.prototype, "harga_per_jam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'desk' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "tipe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSpaceDto.prototype, "kapasitas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Fasilitas upgrade monitor 27 inch 4K' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "deskripsi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'desk_alpha_new.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "foto", void 0);
//# sourceMappingURL=update-space.dto.js.map