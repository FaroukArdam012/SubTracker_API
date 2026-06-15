// /import mongoose from 'mongoose';
// import { DATABASE_URL,NODE_ENV } from '../config/env.js';
// if(!DATABASE_URL){
//     throw new Error('please define the MONGODB_URL env variable inside .env<dev/prod.>.local')
// }

// const connecToDB= async () => {
//     try{
//         await mongoose.connect(DATABASE_URL);
//         console.log(`Connected to mongoDB in ${NODE_ENV} mode`)


//     }catch(error){
//         console.error("Error connecting to database", error);
//         process.exit(1);
//     }
// }
// export default connecToDB;
import mongoose from 'mongoose';
import dns from 'dns';
import { DATABASE_URL, NODE_ENV } from '../config/env.js';

// Force Google DNS to resolve MongoDB Atlas SRV records
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

if(!DATABASE_URL){
    throw new Error('please define the MONGODB_URL env variable inside .env<dev/prod.>.local')
}

const connecToDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Connected to mongoDB in ${NODE_ENV} mode`);
    } catch(error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}

export default connecToDB;