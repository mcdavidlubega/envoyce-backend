import { PrismaClient, Prisma } from '@prisma/client'
import{Request, Response} from 'express'
const prisma = new PrismaClient()

const createUser = async(req:Request, res:Response)=>{
    const {email, name} = req.body
    const user = await prisma.users.create({
        data:{
            name,
            email,
        },
    })

    res.status(201).json(user)
}

const getAllUsers = async(req:Request, res:Response)=>{
    const users = await prisma.users.findMany()
    res.status(200).json(users)
}


export default {createUser, getAllUsers}