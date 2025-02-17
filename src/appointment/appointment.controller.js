import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';
import Appointment from './appointment.model.js';

export const saveAppointment = async (req, res) =>{
    try {
        const data = req.body
        const user = await User.findOne({email:data.email});
        const pet = await Pet.findOne({name: data.name});

        if(!user){
            return res.status(404).josn({
                success: false,
                msg: 'Ownen not found'
            })
        }

        if(!pet){
            return res.status(404),json({
                success: false,
                msg: 'Pet not found'
            })
        }

        const appointmet = new Appointment({
            ...data,
            keeper: user._id,
            pet: pet.name
        });

        await appointmet.save();

        res.status(200).json({
            success: true,
            msg: 'Appointment scheduled succesfuly',
            appointmet
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error to save the appointment",
            error
        })
    }
}

export const getAppointmemts = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {status: true};

    try {
        const appointments = await Appointment.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const appointmentWithOwnerNamesAndPetsName = await Promise.all(appointments.map(async (appointment) => {
            const owner = await User.findById(appointment.keeper)
            const pet = await Pet.findById(appointment.pet)
            return {
                ...appointment.toObjects(),
                keeper: owner ? owner.name: "Owner not found",
                pet: pet ? pet.name: "Pet not found"
            }
        }));

        const total = await Appointment.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            appointments: appointmentWithOwnerNamesAndPetsName
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Error to get appointments'.
            error
        })
    }
}

export const searchAppointment = async (req, res) =>{
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id);
        if(!appointment){
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            })
        }

        const owner = await User.findById(appointment.keeper);
        const pet = await Pet.findById(appointment.pet);
        res.status(200).json({
            success: true,
            appointment:{
                ...appointment.toObjects(),
                keeper: owner ? owner.name : "Owner not found",
                pet: pet ? pet.name : "Pet not found"
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to search the appointment',
            error
        })
    }
}

export const updateAppointment = async (req, res = response) =>{
    try {
        const { id } = req.params;
        const { _id,createAt, ...data  } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Appointment update successfully',
            appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:"Error to update the appointment",
            error
        })
    }
}

export const deleteAppointment = async (req, res) =>{
    const { id } = req.params;

    try {
        await Appointment.findByIdAndUpdate(id, {status: "Cancelado"});

        res.status(200).json({
            success: true,
            message: "Appointment delete successfully"
        })
        
    }catch{
        res.status(500).json({
            success: false,
            message: "Error to delete the appointment",
            error
        })
    }
}