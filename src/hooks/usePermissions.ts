import { useState, useEffect } from "react";
import { verifyToken, ROLE_PERMISSIONS } from "@/lib/session";

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<
    (typeof ROLE_PERMISSIONS)["Super-Admin"] | null
  >(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const admin = verifyToken(token);
      setPermissions(admin?.permissions || null);
    }
  }, []);

  return permissions;
};
