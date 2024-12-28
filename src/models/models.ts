import mongoose, { Schema, Document, Model } from "mongoose";

// Define the emergency contact schema
const emergencyContactSchema = new Schema({
  fullName: { type: String },
  relationship: { type: String },
  mobile: { type: String },
});

// Define the address schema
const addressSchema = new Schema({
  neighborhood: { type: String },
  street: { type: String },
  building: { type: String },
  floor: { type: String },
  apartment: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

// Define the Mongoose schema
const StaffSchema = new Schema({
  profilePicture: { type: String },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  sex: { type: String },
  nationality: { type: String },
  employmentType: { type: String },
  position: { type: String },
  unit: { type: String },
  bloodType: { type: String },
  dependents: { type: String },
  unhcrEmail: { type: String },
  privateEmail: { type: String },
  mobileSyriatel: { type: String },
  mobileMtn: { type: String },
  homePhone: { type: String },
  extension: { type: String },
  radio: { type: String },
  emergencyContact: { type: emergencyContactSchema },
  contractType: { type: String },
  contractStartDate: { type: Date },
  contractEndDate: { type: Date },
  nationalIdNumber: { type: String },
  passportNumber: { type: String },
  passportExpiryDate: { type: Date },
  unlpNumber: { type: String },
  unlpExpiryDate: { type: Date },
  criticalStaff: { type: Boolean, default: null },
  warden: { type: String },
  floorMarshal: { type: Boolean, default: null },
  etb: { type: Boolean, default: null },
  ifak: { type: Boolean, default: null },
  advancedDriving: { type: Boolean, default: null },
  insideDs: { type: Boolean, default: null },
  outsideDs: { type: Boolean, default: null },
  address: { type: addressSchema },
});

// Define the emergency contact interface
export interface IEmergencyContact {
  fullName?: string;
  relationship?: string;
  mobile?: string;
}
// Define the address interface
export interface IAddress {
  neighborhood?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  latitude?: string;
  longitude?: string;
}

// Define the TypeScript interface
export interface IStaff extends Document {
  profilePicture?: string;
  fullName: string;
  dateOfBirth?: Date;
  sex?: string;
  nationality?: string;
  employmentType?: string;
  position?: string;
  unit?: string;
  bloodType?: string;
  dependents?: string;
  unhcrEmail?: string;
  privateEmail?: string;
  mobileSyriatel?: string;
  mobileMtn?: string;
  homePhone?: string;
  extension?: string;
  radio?: string;
  emergencyContact?: IEmergencyContact;
  contractType?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  nationalIdNumber?: string;
  passportNumber?: string;
  passportExpiryDate?: Date;
  unlpNumber?: string;
  unlpExpiryDate?: Date;
  criticalStaff?: boolean;
  warden?: string;
  floorMarshal?: boolean;
  etb?: boolean;
  ifak?: boolean;
  advancedDriving?: boolean;
  insideDs?: boolean;
  outsideDs?: boolean;
  address?: IAddress;
}

const UserSchema = new Schema({
  profilePicture: { type: String },
  fullName: { type: String, required: true },
  sex: { type: String, required: true },
  position: { type: String, required: true },
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
  sex: string;
  position: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Guest";
}

// Create the Mongoose model
export const Staff: Model<IStaff> =
  mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
