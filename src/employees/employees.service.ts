import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import prismaConfig from 'src/prisma.config';
import { Employee } from '@prisma/client';
import { transcode } from 'buffer';
import { asyncWrapProviders } from 'async_hooks';
@Injectable()
export class EmployeesService {
   constructor(private prisma :PrismaService){} // importante que sea privado 

   // metodos 
   async getAllEmployees(){
        const employees = await this.prisma.employee.findMany();
        return {respuesta : employees}
   }
   async getOneEmployee(id:string){
        const employee = await this.foundEmpleadoByID(id)
        if(!employee) return {respuesta : `Empleado con el dni : ${id} no existe ` }
        return {respuesta:employee}
   }
  
   async createOneEmployee(employee:Employee){

    // comprobamos si el departamento existe 

    const depFound = await this.foundDepartament(employee.department_id )
    if(!depFound) throw new NotFoundException(`No se encontro un departamento con id ${employee.department_id}`)
        
    
      
    // comprobamos si el empleado existe 
       
    const emFound = await this.foundEmpleadoByObj(employee)
    if(emFound){
        if(emFound.DNI=employee.DNI) throw new Error(`Ya existe un empleado con este dni ${employee.DNI}`)
        throw new Error(`Ya existe un empleado con este login ${employee.login} `)
    }

    // creacion empleado 
        await this.prisma.employee.create({
            data : {
                DNI:employee.DNI,
                name:employee.name,
                login:employee.login,
                password:employee.password,
                department:{
                    connect:{id:employee.department_id}
                }
            }
        })
        return {respuesta : `Nuevo empleado creado con exito `}


   }
    async updateOneEmployee(id:string,employee:Employee){
        // validamos si existe el empleado con ese id 
        const emFound = await this.foundEmpleadoByID(id)
        if(emFound){
            // validamos si existe un empleado ya con el nuevo login 
            const newEmFound = await this.foundEmpleadoByObj(employee)
            if(newEmFound){
                if((newEmFound.DNI==emFound.DNI) || (newEmFound.login ==emFound.login)){

                }
            }
            
        }
        throw new Error(`No existe ningun empleado con el siguiente dni ${id}`)
        
       
        
        
        

        


    }
    async deleteOneEmployee(id:string){
        try{
            await this.prisma.employee.delete({
                where:{DNI:id}
            })
            return {respuesta:'Empleado borrado con exito '}
        }
        catch(error){
            return error
        }

    }

    async getOneEmployeeByLogin(login:string){
            return {respuesta:null}
    }

    // metodos de validacion

    // metodo si existe empleado por Id 
    async foundEmpleadoByID(id:string){
        return await this.prisma.employee.findUnique(
            {
                where : {
                    DNI : id
                }
            }
        )
    }


    
// metodo si existe un empleado 
   async foundEmpleadoByObj(employee:Employee){

    return await this.prisma.employee.findFirst({ // usamos el findFirst porque es el primero que cumpla con las condiciones 
        where: {
            OR: [
                { DNI: employee.DNI },
                { login: employee.login }
            ]
        }
    })
    
   }
   // metodo comprobar si el departamento existe
    async foundDepartament(id:number){

        return await this.prisma.department.findUnique(
            {
                where:{
                    id:id
                }
            }
        )
       
        

   }
}
