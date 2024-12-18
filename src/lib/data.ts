import { Staff } from "@/models/models";
import { User } from "@/models/models";
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

export const getUsers = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting admins");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get admin");
  }
};
