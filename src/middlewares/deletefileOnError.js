import { resolveMx } from 'dns';
import fs from 'fs/primses';
import { join } from 'path';
import { json } from 'stream/consumers';

export const deleteFileOnError = async (error, req, res, next) => {
    if(req.file && req.filePath){
        const filePath = join (req.filePath, req.file.filename);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file: ', error)
        }
    }
    if(error.status === 400 || error.errors){
        return res.status(400).json({
            success: false,
            error: error.errors
        });
    }
    return res.status(500),json({
        success: false,
        message: error.message
    })
}