import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
export declare class AuthService {
    private employeesService;
    private jwtService;
    constructor(employeesService: EmployeesService, jwtService: JwtService);
    signIn(login: string, pass: string): Promise<any>;
}
