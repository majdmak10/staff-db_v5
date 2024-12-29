import mongoose, { Schema, Document, Model } from "mongoose";

interface IEmployee extends Document {
  fullName: string;
  sex: string;
  isActive: boolean; // Add isActive field
}

const EmployeeSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    sex: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // Add default value
  },
  { timestamps: true }
);

export const Employee: Model<IEmployee> =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);
