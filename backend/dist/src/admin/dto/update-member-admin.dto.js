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
exports.UpdateMemberAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateMemberAdminDto {
    nama_member;
    instansi;
    alamat;
    telp;
    password;
    foto;
}
exports.UpdateMemberAdminDto = UpdateMemberAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Budi Raharjo, S.T.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "nama_member", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'PT Teknologi Hebat' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "instansi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jl. Danau Ranau No. 2' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "alamat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '085712345678' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "telp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NewSecret123!' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'budi_new.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberAdminDto.prototype, "foto", void 0);
//# sourceMappingURL=update-member-admin.dto.js.map