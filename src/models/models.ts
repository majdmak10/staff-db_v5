import mongoose, { Schema, Document, Model } from "mongoose";

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
  _id: string;
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
const StaffSchema = new Schema(
  {
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
    unhcrEmail: { type: String, unique: true, match: /.+\@.+\..+/ },
    privateEmail: { type: String, unique: true, match: /.+\@.+\..+/ },
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
    criticalStaff: { type: Boolean, default: true },
    warden: { type: String },
    floorMarshal: { type: Boolean, default: true },
    etb: { type: Boolean, default: true },
    ifak: { type: Boolean, default: true },
    advancedDriving: { type: Boolean, default: true },
    insideDs: { type: Boolean, default: true },
    outsideDs: { type: Boolean, default: true },
    address: { type: addressSchema },
  },
  { timestamps: true }
);

export enum UserRole {
  Admin = "Admin",
  Editor = "Editor",
  Guest = "Guest",
}

// TypeScript interface
export interface IUser extends Document {
  _id: string; // Explicitly define _id as string
  profilePicture?: string;
  fullName: string;
  sex: string;
  position: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema(
  {
    profilePicture: { type: String },
    fullName: { type: String, required: true },
    sex: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole) },
  },
  { timestamps: true }
);

// Create the Mongoose model
function getModel<T>(name: string, schema: Schema): Model<T> {
  return mongoose.models[name] || mongoose.model<T>(name, schema);
}

export const Staff = getModel<IStaff>("Staff", StaffSchema);
export const User = getModel<IUser>("User", UserSchema);
