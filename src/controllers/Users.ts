import { db } from "@utils/dbconnection";
import { Request, Response } from "express";

const getAllUsers = async(req:Request,res:Response) =>{
    const users = await db.users.findMany();
    if(!users) res.json(404).json({message:'No users found'})

    return res.status(200).json(users)
}

const getAUser = async(req:Request, res:Response)=>{
    const {id} = req.params
    const user =  await db.users.findUnique({
        where:{
            id:id,
        }
    })
    
    if(!user) res.status(404).json({message:'User not found'})

    return res.status(200).json(user)
}

const createUser = async(req:Request, res:Response)=>{
    const {name, email, role, password} = req.body
    const user = await db.users.create({
        data:{
            name,
            email,
            role,
            password
        }
    })
    return res.status(201).json(user)
}

const updateUser =  async(req:Request, res:Response)=>{
    const {id} = req.params
    const {email, name} = req.body
    const updatedUser = await db.users.update({
        where:{
            id,
        },
        data:{
            email,
            name,
        }
    })

    if(!updatedUser) res.status(404).json({message:'User not found'})
    return res.status(201).json(updatedUser)
}

const updateUserRole = async(req:Request, res:Response)=>{
    const {id} = req.params
    const {role} = req.body
    const updatedUserRole = await db.users.update({
        where:{
            id,
        },
        data:{
            role,
        }
    })
    return res.status(201).json(updatedUserRole)
}

const deleteUser = async(req:Request, res:Response)=>{
    const {id} = req.params
    await db.users.delete({
        where:{
            id,
        }
    })

    return res.status(200).json({message:'user deleted'})
}
export default {getAllUsers, getAUser, createUser, updateUser, updateUserRole, deleteUser}