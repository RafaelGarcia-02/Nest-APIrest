import { PrismaService } from 'src/prisma.service';
import { Employee } from '@prisma/client';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllEmployees(): Promise<{
        respuesta: {
            DNI: string;
            name: string;
            login: string;
            password: string;
            department_id: number;
        }[];
    }>;
    getOneEmployee(id: string): Promise<{
        respuesta: string;
    } | {
        respuesta: {
            DNI: string;
            name: string;
            login: string;
            password: string;
            department_id: number;
        };
    }>;
    createOneEmployee(employee: Employee): Promise<{
        respuesta: string;
    }>;
    updateOneEmployee(id: string, employee: Employee): Promise<void>;
    deleteOneEmployee(id: string): Promise<any>;
    getOneEmployeeByLogin(login: string): Promise<{
        respuesta: null;
    }>;
    foundEmpleadoByID(id: string): Promise<{
        DNI: string;
        name: string;
        login: string;
        password: string;
        department_id: number;
    } | null>;
    foundEmpleadoByObj(employee: Employee): Promise<{
        DNI: string;
        name: string;
        login: string;
        password: string;
        department_id: number;
    } | null>;
    foundDepartament(id: number): Promise<{
        name: string;
        id: number;
        phone: string;
        email: string | null;
    } | null>;
}
