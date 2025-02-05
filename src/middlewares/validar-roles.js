export const tieneRole = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario){
            return res.status(500).js({
                success: false,
                msg: 'Se quiere verificar un role sin verificar un token primero'
            })
        }
        if (!roles.includes(req.usuario.roles)){
            return res.status(401),json({
                success: false,
                msg: `Usuario no autorizado, posee un rol ${req.usuario.role}, los roles autorizados son ${roles}`
            })
        }
        next();
    }
}