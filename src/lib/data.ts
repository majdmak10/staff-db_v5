import { Staff } from "@/models/models";
import { Admin } from "@/models/models";
import { connectToDB } from "@/utils/connectToDb";

export const getStaff = async () => {
  try {
    connectToDB();
    const staff = await Staff.find();
    return staff;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting staff");
  }
};

export const getStaffById = async (id: string) => {
  try {
    const staffMember = await Staff.findById(id);
    return staffMember;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get staff member");
  }
};

export const getAdmins = async () => {
  try {
    connectToDB();
    const admins = await Admin.find();
    return admins;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting admins");
  }
};

export const getAdminById = async (id: string) => {
  try {
    const admin = await Admin.findById(id);
    return admin;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get admin");
  }
};
