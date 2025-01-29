import {Schema, model} from 'mongoose';


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name in required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    surname:{
        type: String,
        required: [21, 'Cant be overcome 25 characters']
    },
    username:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email in required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'] 
    },
    estado: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true, //Agregar el createAt y updateAt
        versionKey: false //No agrega el campo __v
    }
);

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);
