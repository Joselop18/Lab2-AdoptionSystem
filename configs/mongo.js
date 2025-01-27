'use strict';

import mongoose from "mongoose";

export const dbConnection = async () =>{
    try{
        mongoose.connect.on('error', ()=> {
            console.log('MongoDB | could not be connected to MongoDB');
        });
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | Try connection');
        });
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected to MongoDB');
        });
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | connected to database');
        });
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconnected');
        });
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });
    }catch(error) {
        console.log('database connection failed, error')
    }
}