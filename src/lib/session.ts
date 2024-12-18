import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Define allowed roles
type UserRole = "Super-Admin" | "Admin" | "Guest";

// Define the structure of the admin data
interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: UserRole; // Restrict role to the allowed roles
}

// Create a JWT token for the admin
export const createToken = (admin: Admin): string => {
  return jwt.sign(
    {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" } // Token expiry time
  );
};

// Verify the token and return the payload
export const verifyToken = (
  token: string
): { id: string; role: UserRole } | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
      role: UserRole;
    };
    return { id: payload.id, role: payload.role };
  } catch {
    return null; // Return null for invalid tokens
  }
};
