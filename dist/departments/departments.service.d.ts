import { Departments } from './departments.interface';
import { PrismaService } from '../prisma.service';
export declare class DepartmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllDepartments(): Promise<{
        respuesta: {
            id: number;
            name: string;
            phone: string;
            email: string | null;
        }[];
    }>;
    getOneDepartment(id: string): Promise<{
        respuesta: {
            id: number;
            name: string;
            phone: string;
            email: string | null;
        };
    }>;
    createOneDepartment(department: Departments): Promise<{
        respuesta: string;
    }>;
    updateOneDepartment(id: string, department: Departments): Promise<{
        respuesta: any;
    }>;
    deleteOneDepartment(id: string): Promise<{
        respuesta: any;
    }>;
    deleteAll(): Promise<{
        respuesta: string;
    }>;
    getEmployee(id: string): Promise<{
        respuesta: any;
    }>;
}
