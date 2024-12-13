"use server";

import { Staff } from "@/models/models";
import { Admin } from "@/models/models";
import { connectToDB } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createToken } from "@/lib/session";
import { verifyToken } from "@/lib/session";
import bcrypt from "bcrypt";

export const addStaff = async (formData: FormData): Promise<void> => {
  const { fullName, sex, email, criticalStaff } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();
    const newStaff = new Staff({
      fullName,
      sex,
      email,
      criticalStaff: criticalStaff === "Yes",
    });
    await newStaff.save();
    console.log("Staff added successfully");
  } catch (err) {
    console.error("Failed to add staff:", err);
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export const updateStaff = async (formData: FormData): Promise<void> => {
  const { id, fullName, sex, email, criticalStaff } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields = {
      fullName,
      sex,
      email,
      criticalStaff: criticalStaff === "true",
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key as keyof typeof updateFields] === "" || undefined) {
        delete updateFields[key as keyof typeof updateFields];
      }
    });

    await Staff.findByIdAndUpdate(id, updateFields);
    console.log("Staff updated successfully");
  } catch (err) {
    console.error("Failed to update staff:", err);
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export const deleteStaff = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    await Staff.findByIdAndDelete(id);
    console.log("Staff deleted successfully");
  } catch (err) {
    console.error("Failed to delete staff:", err);
  }

  revalidatePath("/dashboard/staff");
};

export const addAdmin = async (formData: FormData): Promise<void> => {
  const { fullName, email, username, password, role } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      fullName,
      email,
      username,
      password: hashedPassword,
      role:
        role === "Super-Admin" || role === "Admin" || role === "Guest"
          ? role
          : "Guest", // Fallback role
    });

    await newAdmin.save();
    console.log("Admin added successfully");
  } catch (err) {
    console.error("Failed to add admin:", err);
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const updateAdmin = async (formData: FormData): Promise<void> => {
  const { id, fullName, email, username, password, role } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields = {
      fullName,
      email,
      username,
      password,
      role: role === "true",
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key as keyof typeof updateFields] === "" || undefined) {
        delete updateFields[key as keyof typeof updateFields];
      }
    });

    await Admin.findByIdAndUpdate(id, updateFields);
    console.log("Admin updated successfully");
  } catch (err) {
    console.error("Failed to update admin:", err);
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const deleteAdmin = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    await Admin.findByIdAndDelete(id);
    console.log("Admin deleted successfully");
  } catch (err) {
    console.error("Failed to delete admin:", err);
  }

  revalidatePath("/dashboard/admins");
};

export const loginAdmin = async (
  formData: FormData
): Promise<string | null> => {
  const { username, password } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await connectToDB();

    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Ensure _id is a string
    const token = createToken({
      id: admin._id.toString(),
      fullName: admin.fullName,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    });
    return token;
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
};

export const getCurrentAdminRole = async (
  cookie: string | undefined
): Promise<string | null> => {
  if (!cookie) return null;
  const admin = verifyToken(cookie);
  return admin?.role || null;
};
