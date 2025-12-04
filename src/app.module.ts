import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsService } from './departments/departments.service';
import { PrismaService } from './prisma.service';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DepartmentsModule, EmployeesModule, AuthModule],
  controllers: [],
  providers: [DepartmentsService, PrismaService],
})
export class AppModule {}
