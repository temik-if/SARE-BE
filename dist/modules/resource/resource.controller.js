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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("./resource.service");
const createResource_dto_1 = require("./dto/createResource.dto");
let ResourceController = class ResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async createResource(createResourceDto) {
        return this.resourceService.createResource(createResourceDto);
    }
    async getAllResources() {
        return this.resourceService.getAllResources();
    }
    async getAllEquipment() {
        return this.resourceService.getAllEquipments();
    }
    async getResourceById(id) {
        return this.resourceService.getResourceById(Number(id));
    }
    async updateResource(id, updateResourceDto) {
        return this.resourceService.updateResource(Number(id), updateResourceDto);
    }
    async deleteResource(id) {
        return this.resourceService.deleteResource(Number(id));
    }
};
exports.ResourceController = ResourceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createResource_dto_1.CreateResourceDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "createResource", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getAllResources", null);
__decorate([
    (0, common_1.Get)(':equipment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getAllEquipment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "getResourceById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createResource_dto_1.CreateResourceDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "deleteResource", null);
exports.ResourceController = ResourceController = __decorate([
    (0, common_1.Controller)('resources'),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], ResourceController);
//# sourceMappingURL=resource.controller.js.map