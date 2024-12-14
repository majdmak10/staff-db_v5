import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Define role permissions
export const ROLE_PERMISSIONS = {
  "Super-Admin": {
    canAddStaff: true,
    canUpdateStaff: true,
    canDeleteStaff: true,
    canAddAdmin: true,
    canUpdateAdmin: true,
    canDeleteAdmin: true,
    canAccessAllDashboards: true,
  },
  Admin: {
    canAddStaff: true,
    canUpdateStaff: true,
    canDeleteStaff: false,
    canAddAdmin: false,
    canUpdateAdmin: false,
    canDeleteAdmin: false,
    canAccessAllDashboards: true,
  },
  Guest: {
    canAddStaff: false,
    canUpdateStaff: false,
    canDeleteStaff: false,
    canAddAdmin: false,
    canUpdateAdmin: false,
    canDeleteAdmin: false,
    canAccessAllDashboards: false,
  },
};

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
      username: admin.username,
      role: admin.role,
      permissions:
        ROLE_PERMISSIONS[admin.role as keyof typeof ROLE_PERMISSIONS],
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
      role: string;
      permissions: (typeof ROLE_PERMISSIONS)[keyof typeof ROLE_PERMISSIONS];
    };
    console.log("Token verified successfully:", payload);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
