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
  const profilePictureFile = formData.get("profilePicture") as File;

  const emergencyContact = {
    fullName: formData.get("emergencyContactName") || "N/A",
    relationship: formData.get("emergencyContactRelationship") || "N/A",
    mobile: formData.get("emergencyContactMobile") || "N/A",
  };

  const address = {
    neighborhood: formData.get("addressNeighborhood") || "N/A",
    street: formData.get("addressStreet") || "N/A",
    building: formData.get("addressBuilding") || "N/A",
    floor: formData.get("addressFloor") || "N/A",
    apartment: formData.get("addressApartment") || "N/A",
    latitude: formData.get("latitude") || "N/A",
    longitude: formData.get("longitude") || "N/A",
  };

  const {
    fullName,
    dateOfBirth,
    sex,
    nationality,
    employmentType,
    position,
    unit,
    bloodType,
    dependents,
    unhcrEmail,
    privateEmail,
    mobileSyriatel,
    mobileMtn,
    homePhone,
    extension,
    radio,
    contractType,
    contractStartDate,
    contractEndDate,
    nationalIdNumber,
    passportNumber,
    passportExpiryDate,
    unlpNumber,
    unlpExpiryDate,
    criticalStaff,
    warden,
    floorMarshal,
    etb,
    ifak,
    advancedDriving,
    insideDs,
    outsideDs,
  } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

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
        "profiles_pictures",
        "staff"
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
      profilePicturePath = `/uploads/profiles_pictures/staff/${uniqueFilename}`;
    }

    const newStaff = new Staff({
      profilePicture: profilePicturePath,
      fullName: fullName || "N/A",
      dateOfBirth: dateOfBirth || null,
      sex: sex || "N/A",
      nationality: nationality || "N/A",
      employmentType: employmentType || "N/A",
      position: position || "N/A",
      unit: unit || "N/A",
      bloodType: bloodType || "N/A",
      dependents: dependents || "N/A",
      unhcrEmail: unhcrEmail || "N/A",
      privateEmail: privateEmail || "N/A",
      mobileSyriatel: mobileSyriatel || "N/A",
      mobileMtn: mobileMtn || "N/A",
      homePhone: homePhone || "N/A",
      extension: extension || "N/A",
      radio: radio || "N/A",
      emergencyContact,
      contractType: contractType || "N/A",
      contractStartDate: contractStartDate || null,
      contractEndDate: contractEndDate || null,
      nationalIdNumber: nationalIdNumber || "N/A",
      passportNumber: passportNumber || "N/A",
      passportExpiryDate: passportExpiryDate || null,
      unlpNumber: unlpNumber || "N/A",
      unlpExpiryDate: unlpExpiryDate || null,
      criticalStaff: criticalStaff === "Yes",
      warden: warden || "N/A",
      floorMarshal: floorMarshal === "Yes",
      etb: etb === "Yes",
      ifak: ifak === "Yes",
      advancedDriving: advancedDriving === "Yes",
      insideDs: insideDs === "Yes",
      outsideDs: outsideDs === "Yes",
      address,
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
  const { fullName, sex, position, email, password, confirmPassword, role } =
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
        "profiles_pictures",
        "admins"
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
      position,
      sex: sex === "Female" || sex === "Male" ? sex : "Male",
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
    fullName,
    position,
    sex,
    email,
    password,
    confirmPassword,
    role,
  } = Object.fromEntries(formData) as Record<string, string>;

  const profilePictureFile = formData.get("profilePicture") as File;
  let profilePicturePath = "";

  if (profilePictureFile && profilePictureFile.size > 0) {
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "profiles_pictures"
    );
    await fs.mkdir(uploadDir, { recursive: true });

    const originalFilename = profilePictureFile.name;
    let uniqueFilename = originalFilename;
    let fileCounter = 1;

    // Check for existing files with the same name
    while (
      await fs.stat(path.join(uploadDir, uniqueFilename)).catch(() => false)
    ) {
      const nameWithoutExt = path.parse(originalFilename).name;
      const ext = path.extname(originalFilename);
      uniqueFilename = `${nameWithoutExt}-${fileCounter}${ext}`;
      fileCounter++;
    }

    const fullPath = path.join(uploadDir, uniqueFilename);

    // Write the new profile picture
    const buffer = Buffer.from(await profilePictureFile.arrayBuffer());
    await fs.writeFile(fullPath, buffer);

    profilePicturePath = `/uploads/profiles_pictures/${uniqueFilename}`;
  }

  try {
    await connectToDB();

    // Fetch existing user data to delete old profile picture
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const oldProfilePicturePath = existingUser.profilePicture;
    const oldFullPath = oldProfilePicturePath
      ? path.join(process.cwd(), "public", oldProfilePicturePath)
      : null;

    const updateFields = {
      ...(profilePicturePath ? { profilePicture: profilePicturePath } : {}),
      fullName,
      position,
      sex,
      email,
      password,
      confirmPassword,
      role,
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key as keyof typeof updateFields] === "" || undefined) {
        delete updateFields[key as keyof typeof updateFields];
      }
    });

    // Update the user data in the database
    await User.findByIdAndUpdate(id, updateFields);

    // Delete the old profile picture if it exists and is different from the new one
    if (
      oldFullPath &&
      oldFullPath !== path.join(process.cwd(), profilePicturePath)
    ) {
      await fs.unlink(oldFullPath).catch((err) => {
        console.error("Failed to delete old profile picture:", err);
      });
    }

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
