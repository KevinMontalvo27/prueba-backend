import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL)
            console.log(`MongoDB conectado correctamente: ${connection.connection.host}`);

    }catch(error){
        console.error(`Error conectandose a MongoDB: ${error.message}`);
        process.exit(1);
    }

    mongoose.connection.on('Conectado', () =>{
        console.log('Mongoose conectado a la base de datos');
    })

    mongoose.connection.on('error', (error) =>{
        console.error(`Error en la conexion de Mongoose: ${error.message}`);
    })

    mongoose.connection.on('disconnected', () =>{
        console.log('Mongoose se ha desconectado de la base de datos');
    })

    
};

export default connectDB;


