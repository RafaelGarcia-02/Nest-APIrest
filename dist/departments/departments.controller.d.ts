import { DepartmentsService } from './departments.service';
import type { Departments } from './departments.interface';
export declare class DepartmentsController {
    private departmentService;
    constructor(departmentService: DepartmentsService);
    index(): Promise<{
        respuesta: {
            id: number;
            name: string;
            phone: string;
            email: string | null;
        }[];
    }>;
    show(id: string): Promise<{
        respuesta: {
            id: number;
            name: string;
            phone: string;
            email: string | null;
        };
    }>;
    store(department: Departments): Promise<{
        respuesta: string;
    }>;
    update(id: string, department: Departments): Promise<{
        respuesta: any;
    }>;
    destroy(id: string): Promise<{
        respuesta: any;
    }>;
    destroyAll(): Promise<{
        respuesta: string;
    }>;
}
