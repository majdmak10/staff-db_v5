"use server";

import { Employee } from "@/models/modelsTest";
import { connectToDB } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addEmployee = async (formData: FormData): Promise<void> => {
  const { fullName, sex, isActive } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await connectToDB();

    const newEmployee = new Employee({
      fullName: fullName || "N/A",
      sex: sex || "N/A",
      isActive:
        isActive === "true" ? true : isActive === "false" ? false : null, // Use null for "N/A"
    });

    await newEmployee.save();
    console.log("Employee added successfully");
  } catch (err) {
    console.error("Failed to add employee:", err);
    throw err;
  }

  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};
