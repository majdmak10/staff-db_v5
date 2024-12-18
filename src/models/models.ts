import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Mongoose schema
const StaffSchema = new Schema({
  picture: { type: String },
  fullName: { type: String, required: true },
  sex: { type: String, required: true },
  email: { type: String, required: true },
  criticalStaff: { type: Boolean, required: true },
});

// Define the TypeScript interface
export interface IStaff extends Document {
  picture?: string;
  fullName: string;
  sex: string;
  email: string;
  criticalStaff: boolean;
}

const AdminSchema = new Schema({
  picture: { type: String },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Super-Admin", "Admin", "Guest"],
  }, // Role field
});

// TypeScript interface
export interface IAdmin extends Document {
  _id: string; // Explicitly define _id as string
  picture?: string;
  fullName: string;
  email: string;
  password: string;
  role: "Super-Admin" | "Admin" | "Guest";
}

// Create the Mongoose model
export const Staff: Model<IStaff> =
  mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
