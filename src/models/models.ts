import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Mongoose schema
const StaffSchema = new Schema({
  profilePicture: { type: String },
  fullName: { type: String, required: true },
  sex: { type: String, required: true },
  email: { type: String, required: true },
  criticalStaff: { type: Boolean, required: true },
});

// Define the TypeScript interface
export interface IStaff extends Document {
  profilePicture?: string;
  fullName: string;
  sex: string;
  email: string;
  criticalStaff: boolean;
}

const UserSchema = new Schema({
  profilePicture: { type: String },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Editor", "Guest"],
  }, // Role field
});

// TypeScript interface
export interface IUser extends Document {
  _id: string; // Explicitly define _id as string
  profilePicture?: string;
  fullName: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Guest";
}

// Create the Mongoose model
export const Staff: Model<IStaff> =
  mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
