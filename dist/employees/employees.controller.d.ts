import { EmployeesService } from './employees.service';
import type { Employees } from './employees.interface';
export declare class EmployeesController {
    private employeesService;
    constructor(employeesService: EmployeesService);
    index(): Promise<{
        respuesta: {
            DNI: string;
            name: string;
            login: string;
            password: string;
            department_id: number;
        }[];
    }>;
    show(id: string): Promise<{
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
    store(employee: Employees): Promise<{
        respuesta: string;
    }>;
    update(id: string, employee: Employees): Promise<void>;
    destroy(id: string): Promise<any>;
}
