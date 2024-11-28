import mongoose from "mongoose";

interface ConnectionType {
  isConnected?: number;
}

const connection: ConnectionType = {};

export const connectToDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO as string);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected:", connection.isConnected);
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
};
