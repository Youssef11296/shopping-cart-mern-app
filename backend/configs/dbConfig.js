import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    mongoose.set ('strictQuery', false);
    const conn = await mongoose.connect (process.env.MONGO_URI, {});
    console.log (`DB established ON host: ${conn.connection.host}`);
  } catch (error) {
    console.log (`DB CONNECTION ERROR: ${error}`);
  }
};

export {connectDb};
