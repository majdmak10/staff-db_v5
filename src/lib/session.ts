import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const createToken = (admin: {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
}): string => {
  return jwt.sign(
    {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      username: admin.username, // Include username here
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" } // Token expiry time
  );
};

export const verifyToken = (
  token: string
): { id: string; role: string } | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
      role: string;
    };
    return { id: payload.id, role: payload.role };
  } catch {
    return null;
  }
};

// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// export const createToken = (user: { id: string; role: string }): string => {
//   return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
// };

// export const verifyToken = (
//   token: string
// ): { id: string; role: string } | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
//   } catch {
//     return null;
//   }
// };
