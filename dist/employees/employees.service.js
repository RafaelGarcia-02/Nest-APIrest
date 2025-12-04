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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EmployeesService = class EmployeesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllEmployees() {
        const employees = await this.prisma.employee.findMany();
        return { respuesta: employees };
    }
    async getOneEmployee(id) {
        const employee = await this.foundEmpleadoByID(id);
        if (!employee)
            return { respuesta: `Empleado con el dni : ${id} no existe ` };
        return { respuesta: employee };
    }
    async createOneEmployee(employee) {
        const depFound = await this.foundDepartament(employee.department_id);
        if (!depFound)
            throw new common_1.NotFoundException(`No se encontro un departamento con id ${employee.department_id}`);
        const emFound = await this.foundEmpleadoByObj(employee);
        if (emFound) {
            if (emFound.DNI = employee.DNI)
                throw new Error(`Ya existe un empleado con este dni ${employee.DNI}`);
            throw new Error(`Ya existe un empleado con este login ${employee.login} `);
        }
        await this.prisma.employee.create({
            data: {
                DNI: employee.DNI,
                name: employee.name,
                login: employee.login,
                password: employee.password,
                department: {
                    connect: { id: employee.department_id }
                }
            }
        });
        return { respuesta: `Nuevo empleado creado con exito ` };
    }
    async updateOneEmployee(id, employee) {
        const emFound = await this.foundEmpleadoByID(id);
        if (emFound) {
            const newEmFound = await this.foundEmpleadoByObj(employee);
            if (newEmFound) {
                if ((newEmFound.DNI == emFound.DNI) || (newEmFound.login == emFound.login)) {
                }
            }
        }
        throw new Error(`No existe ningun empleado con el siguiente dni ${id}`);
    }
    async deleteOneEmployee(id) {
        try {
            await this.prisma.employee.delete({
                where: { DNI: id }
            });
            return { respuesta: 'Empleado borrado con exito ' };
        }
        catch (error) {
            return error;
        }
    }
    async getOneEmployeeByLogin(login) {
        return { respuesta: null };
    }
    async foundEmpleadoByID(id) {
        return await this.prisma.employee.findUnique({
            where: {
                DNI: id
            }
        });
    }
    async foundEmpleadoByObj(employee) {
        return await this.prisma.employee.findFirst({
            where: {
                OR: [
                    { DNI: employee.DNI },
                    { login: employee.login }
                ]
            }
        });
    }
    async foundDepartament(id) {
        return await this.prisma.department.findUnique({
            where: {
                id: id
            }
        });
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map