"use server";

import { Staff } from "@/models/models";
import { User } from "@/models/models";
import { connectToDB } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { promises as fs } from "fs";
import path from "path";

export const addStaff = async (formData: FormData): Promise<void> => {
  const { profilePicture, fullName, sex, email, criticalStaff } =
    Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();
    const newStaff = new Staff({
      profilePicture,
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
  const { id, profilePicture, fullName, sex, email, criticalStaff } =
    Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields = {
      profilePicture,
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
  const { fullName, email, password, confirmPassword, role } =
    Object.fromEntries(formData) as Record<string, string>;

  // Get the file from formData
  const profilePictureFile = formData.get("profilePicture") as File;

  try {
    await connectToDB();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Handle profile picture upload
    let profilePicturePath = "";
    if (profilePictureFile && profilePictureFile.size > 0) {
      // Get original filename and extension
      const originalFilename = profilePictureFile.name;
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);

      // Ensure the upload directory exists
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profiles_pictures"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      // Function to generate unique filename
      const generateUniqueFilename = async (
        baseName: string,
        ext: string,
        counter = 0
      ): Promise<string> => {
        const suffix = counter > 0 ? `_${counter}` : "";
        const potentialFilename = `${baseName}${suffix}${ext}`;
        const fullPath = path.join(uploadDir, potentialFilename);

        try {
          // Check if file exists
          await fs.access(fullPath);
          // If file exists, try again with incremented counter
          return generateUniqueFilename(baseName, ext, counter + 1);
        } catch {
          // File doesn't exist, so this filename is unique
          return potentialFilename;
        }
      };

      // Generate unique filename
      const uniqueFilename = await generateUniqueFilename(
        baseFilename,
        fileExtension
      );

      // Convert File to Buffer
      const bytes = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write file to public directory
      const fullFilePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(fullFilePath, buffer);

      // Store relative path for database and frontend
      profilePicturePath = `/uploads/profiles_pictures/${uniqueFilename}`;
    }

    const newUser = new User({
      profilePicture: profilePicturePath,
      fullName,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role:
        role === "Admin" || role === "Editor" || role === "Guest"
          ? role
          : "Guest",
    });

    await newUser.save();
    console.log("User added successfully");
  } catch (err) {
    console.error("Failed to add user:", err);
    throw err;
  }

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const updateUser = async (formData: FormData): Promise<void> => {
  const {
    id,
    profilePicture,
    fullName,
    email,
    password,
    confirmPassword,
    role,
  } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields = {
      profilePicture,
      fullName,
      email,
      password,
      confirmPassword,
      role, // Directly assign the role as a string
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

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
};

export const deleteUser = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    // Find the user to get the profile picture path
    const user = await User.findById(id);

    if (user?.profilePicture) {
      const profilePicturePath = path.join(
        process.cwd(),
        "public",
        user.profilePicture
      );

      try {
        // Remove the profile picture file
        await fs.unlink(profilePicturePath);
        console.log("Profile picture deleted successfully");
      } catch (fileError) {
        console.error("Failed to delete profile picture:", fileError);
      }
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);
    console.log("User deleted successfully");
  } catch (err) {
    console.error("Failed to delete user:", err);
  }

  revalidatePath("/dashboard/admins");
};
