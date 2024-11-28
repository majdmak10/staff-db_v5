"use server";

import { Staff } from "@/models/models";
import { User } from "@/models/models";
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

export const addUser = async (formData: FormData): Promise<void> => {
  const { fullName, username, password, role } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("User added successfully");
  } catch (err) {
    console.error("Failed to add user:", err);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData: FormData): Promise<void> => {
  const { id, username, password, isAdmin } = Object.fromEntries(
    formData
  ) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields = {
      username,
      password,
      isAdmin: isAdmin === "true",
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key as keyof typeof updateFields] === "" || undefined) {
        delete updateFields[key as keyof typeof updateFields];
      }
    });

    await User.findByIdAndUpdate(id, updateFields);
    console.log("User updated successfully");
  } catch (err) {
    console.error("Failed to update user:", err);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    await User.findByIdAndDelete(id);
    console.log("User deleted successfully");
  } catch (err) {
    console.error("Failed to delete user:", err);
  }

  revalidatePath("/dashboard/users");
};

export const loginUser = async (formData: FormData): Promise<string | null> => {
  const { username, password } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await connectToDB();

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Ensure _id is a string
    const token = createToken({
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      role: user.role,
    });
    return token;
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
};

export const getCurrentUserRole = async (
  cookie: string | undefined
): Promise<string | null> => {
  if (!cookie) return null;
  const user = verifyToken(cookie);
  return user?.role || null;
};
