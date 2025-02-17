import { response, request } from "express";
import { hash } from "argon2";
import User from "./user.model.js";
 
export const getUsers = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0} = req.query;
        const query = { estado: true};
 
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
 
        res.status(200).json({
            sucess: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            msg: 'Error al obtener usuarios',
            error
        })
    }
}

export const getUserById = async (req, res) => {
    try {
 
        const { id } = req.params;
 
        const user = await User.findById(id);
 
        if(!user){
            return res.status(404).json({
                success: false,
                msg: 'Usuario not found'
            })
        }
 
        res.status(200).json({
            success: true,
            user
        })
 
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener usuarios',
            error
        })
    }
}

export const updateUser = async (req, res = response) => {
    try {
        const {id} = req.params;
        const {_id, email, password, ...data} = req.body;
        

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'User update !!',
            user
        })
    } catch (error) {
        res.status(500).json({
            succccess: false,
            msg: 'Error to update user',
            error
        })
    }
}

export const updatePassword = async (req, res = response) => {
    try {
        const {id} = req.params;
        const {password} = req.body;
        const data = {};

        if(password){
            data.password = await hash(password);
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Password update!!',
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to update password',
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, {estado: false}, {new: true});
        const autheticatedUser = req.user;

        res.status(200).json({
            succes: true,
            msg: 'Usuario desactivado',
            user,
            autheticatedUser
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al desactivar usuario',
            error
        })
    }
}
 