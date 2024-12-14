"use server";

import { Staff } from "@/models/models";
import { Admin } from "@/models/models";
import { connectToDB } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createToken } from "@/lib/session";
import { verifyToken, ROLE_PERMISSIONS } from "@/lib/session";
import bcrypt from "bcrypt";

const checkPermission = (
  token: string | undefined,
  permission: keyof (typeof ROLE_PERMISSIONS)["Super-Admin"]
) => {
  if (!token) throw new Error("No authentication token");

  const admin = verifyToken(token);
  if (!admin) throw new Error("Invalid token");

  if (!admin.permissions[permission]) {
    throw new Error("Unauthorized");
  }

  return admin;
};

export const addStaff = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canAddStaff");

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
    throw err;
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export const updateStaff = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canUpdateStaff");

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
    throw err;
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export const deleteStaff = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canDeleteStaff");

  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    await Staff.findByIdAndDelete(id);
    console.log("Staff deleted successfully");
  } catch (err) {
    console.error("Failed to delete staff:", err);
    throw err;
  }

  revalidatePath("/dashboard/staff");
};

export const addAdmin = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canAddAdmin");

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
    throw err;
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const updateAdmin = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canUpdateAdmin");

  const { id, fullName, email, username, password, role } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    // Define an interface for the update fields
    interface AdminUpdateFields {
      fullName?: string;
      email?: string;
      username?: string;
      password?: string;
      role?: string;
    }

    const updateFields: AdminUpdateFields = {};

    // Type-safe way to add fields
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;

    // Only update password if provided
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    // Only update role if the current user has permission
    if (role) {
      updateFields.role = role;
    }

    // Now use updateFields in your update operation
    await Admin.findByIdAndUpdate(id, updateFields);

    // Rest of the code remains the same

    await Admin.findByIdAndUpdate(id, updateFields);
    console.log("Admin updated successfully");
  } catch (err) {
    console.error("Failed to update admin:", err);
    throw err;
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const deleteAdmin = async (
  formData: FormData,
  token?: string
): Promise<void> => {
  checkPermission(token, "canDeleteAdmin");

  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    await Admin.findByIdAndDelete(id);
    console.log("Admin deleted successfully");
  } catch (err) {
    console.error("Failed to delete admin:", err);
    throw err;
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
      console.error("Admin not found");
      return null; // Return null if the admin is not found
    }

    console.log("Admin found:", admin);

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.error("Invalid password");
      return null; // Return null if the password is invalid
    }

    console.log("Password is valid");

    // Generate token
    const token = createToken({
      id: admin._id.toString(),
      fullName: admin.fullName,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    });

    console.log("Token generated:", token);
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
