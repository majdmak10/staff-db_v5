"use server";

import { Employee } from "@/models/modelsTest";
import { connectToDB } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addEmployee = async (formData: FormData): Promise<void> => {
  const { fullName, sex } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await connectToDB();

    const newEmployee = new Employee({
      fullName: fullName || "N/A",
      sex: sex || "N/A",
    });

    await newEmployee.save();
    console.log("Staff added successfully");
  } catch (err) {
    console.error("Failed to add staff:", err);
    throw err;
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};
