import { Injectable, NotFoundException } from '@nestjs/common';
import { find } from 'rxjs';
import { Departments } from './departments.interface';
import { PrismaService } from '../prisma.service';
import { threadCpuUsage } from 'process';

@Injectable()
export class DepartmentsService {

    constructor(private prisma: PrismaService){}
    async getAllDepartments(){
        const departments = await this.prisma.department.findMany();
        return {'respuesta': departments}

    }
    async getOneDepartment(id:string){
        const departament = await this.prisma.department.findUnique({
            where : {id:parseInt(id)} // esta diciendo que la id de la consulta es esa id 
        })  // la nomenclatura del where es por Prisma 
        if(!departament){
            // return {'respuesta':`Departamento con id ${id} no existe`}
           throw new NotFoundException(`El departamento con id ${id} no existe`)
        }
        return {'respuesta':departament}

    }
    async createOneDepartment(department:Departments){
        // prisma funciona tan bien que no necesita especificar si necesita el id o no 
        await this.prisma.department.create({
            data : department 
        })
        return {'respuesta':`Departamento creado con exito`}
    }
    async updateOneDepartment(id:string,department:Departments){
        try{
            const departament = await this.prisma.department.update({
                where:{id:parseInt(id)}, data : department

            })
            return {respuesta:departament}

        }catch(error){
            return {respuesta:error.meta.cause}

        }


    }
    async deleteOneDepartment(id:string){
        try{
            await this.prisma.department.delete({
                where:{id:parseInt(id)}
            })
            return {'respuesta':`Departamento con id ${id} ha sido borrado con exito`}
        }
        catch(error){
            return {
                respuesta: error.meta.cause
            }

        }

    }
    async deleteAll(){
        await this.prisma.department.deleteMany();
        return { respuesta :`Todos los departamentos han sido borrados`}
    } 
    // conseguir empleados de un departamento 
    async getEmployee(id : string){
        try{
            const departament = await this.prisma.department.findUnique({
                where:{id:parseInt(id)},
                include: {
                    employees:true
                }
            })
            return {respuesta : departament?.employees}
        }catch(error){
            return {
                respuesta: error
            }
        }
    }
    /** 
     * async deleteAlgunos(min : string,max:string){
     * const i = parseInt(min)
     * cont j = parseInt(max)
     * await this.prisma.department.deleteMany({
     * where : {
     * id : {
     * lte : i,
     * gte : j 
     * }}})
     * return {respuesta : 'exito borrando departamentos '}
     * 
     * }
     */
    // operadores utiles : 
    /*
    gt mayor que 
    gte mayor igual que 
    lt menor que
    lte menor igual 
    in en una lista 
    notIn no en lista
    equals igual 
     */

 
}
