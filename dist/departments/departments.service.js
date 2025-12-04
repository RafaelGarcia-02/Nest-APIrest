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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DepartmentsService = class DepartmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllDepartments() {
        const departments = await this.prisma.department.findMany();
        return { 'respuesta': departments };
    }
    async getOneDepartment(id) {
        const departament = await this.prisma.department.findUnique({
            where: { id: parseInt(id) }
        });
        if (!departament) {
            throw new common_1.NotFoundException(`El departamento con id ${id} no existe`);
        }
        return { 'respuesta': departament };
    }
    async createOneDepartment(department) {
        await this.prisma.department.create({
            data: department
        });
        return { 'respuesta': `Departamento creado con exito` };
    }
    async updateOneDepartment(id, department) {
        try {
            const departament = await this.prisma.department.update({
                where: { id: parseInt(id) }, data: department
            });
            return { respuesta: departament };
        }
        catch (error) {
            return { respuesta: error.meta.cause };
        }
    }
    async deleteOneDepartment(id) {
        try {
            await this.prisma.department.delete({
                where: { id: parseInt(id) }
            });
            return { 'respuesta': `Departamento con id ${id} ha sido borrado con exito` };
        }
        catch (error) {
            return {
                respuesta: error.meta.cause
            };
        }
    }
    async deleteAll() {
        await this.prisma.department.deleteMany();
        return { respuesta: `Todos los departamentos han sido borrados` };
    }
    async getEmployee(id) {
        try {
            const departament = await this.prisma.department.findUnique({
                where: { id: parseInt(id) },
                include: {
                    employees: true
                }
            });
            return { respuesta: departament?.employees };
        }
        catch (error) {
            return {
                respuesta: error
            };
        }
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map