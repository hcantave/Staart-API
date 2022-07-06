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
exports.DomainController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cursor_pipe_1 = require("../../pipes/cursor.pipe");
const optional_int_pipe_1 = require("../../pipes/optional-int.pipe");
const order_by_pipe_1 = require("../../pipes/order-by.pipe");
const where_pipe_1 = require("../../pipes/where.pipe");
const audit_log_decorator_1 = require("../audit-logs/audit-log.decorator");
const scope_decorator_1 = require("../auth/scope.decorator");
const domains_constants_1 = require("./domains.constants");
const domains_dto_1 = require("./domains.dto");
const domains_service_1 = require("./domains.service");
let DomainController = class DomainController {
    constructor(domainsService) {
        this.domainsService = domainsService;
    }
    async create(groupId, data) {
        return this.domainsService.createDomain(groupId, data);
    }
    async getAll(groupId, skip, take, cursor, where, orderBy) {
        return this.domainsService.getDomains(groupId, {
            skip,
            take,
            orderBy,
            cursor,
            where,
        });
    }
    async get(groupId, id) {
        return this.domainsService.getDomain(groupId, Number(id));
    }
    async remove(groupId, id) {
        return this.domainsService.deleteDomain(groupId, Number(id));
    }
    async verifyTxt(groupId, id) {
        return this.domainsService.verifyDomain(groupId, Number(id), domains_constants_1.DOMAIN_VERIFICATION_TXT);
    }
    async verifyHtml(groupId, id) {
        return this.domainsService.verifyDomain(groupId, Number(id), domains_constants_1.DOMAIN_VERIFICATION_HTML);
    }
};
__decorate([
    common_1.Post(),
    audit_log_decorator_1.AuditLog('create-domain'),
    scope_decorator_1.Scopes('group-{groupId}:write-domain-*'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, domains_dto_1.CreateDomainDto]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "create", null);
__decorate([
    common_1.Get(),
    scope_decorator_1.Scopes('group-{groupId}:read-domain-*'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Query('skip', optional_int_pipe_1.OptionalIntPipe)),
    __param(2, common_1.Query('take', optional_int_pipe_1.OptionalIntPipe)),
    __param(3, common_1.Query('cursor', cursor_pipe_1.CursorPipe)),
    __param(4, common_1.Query('where', where_pipe_1.WherePipe)),
    __param(5, common_1.Query('orderBy', order_by_pipe_1.OrderByPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    scope_decorator_1.Scopes('group-{groupId}:read-domain-{id}'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "get", null);
__decorate([
    common_1.Delete(':id'),
    audit_log_decorator_1.AuditLog('delete-domain'),
    scope_decorator_1.Scopes('group-{groupId}:delete-domain-{id}'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "remove", null);
__decorate([
    common_1.Post(':id/verify/txt'),
    audit_log_decorator_1.AuditLog('verify-domain-txt'),
    scope_decorator_1.Scopes('group-{groupId}:write-domain-{id}'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "verifyTxt", null);
__decorate([
    common_1.Post(':id/verify/html'),
    audit_log_decorator_1.AuditLog('verify-domain-html'),
    scope_decorator_1.Scopes('group-{groupId}:write-domain-{id}'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Param('groupId', common_1.ParseIntPipe)),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "verifyHtml", null);
DomainController = __decorate([
    common_1.Controller('groups/:groupId/domains'),
    __metadata("design:paramtypes", [domains_service_1.DomainsService])
], DomainController);
exports.DomainController = DomainController;
//# sourceMappingURL=domains.controller.js.map