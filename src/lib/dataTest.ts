import { Employee } from "@/models/modelsTest";
import { connectToDB } from "@/utils/connectToDb";

export const getEmployees = async () => {
  try {
    connectToDB();
    const employees = await Employee.find();
    return employees;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting employees");
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await Employee.findById(id);
    return employee;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get employee");
  }
};
