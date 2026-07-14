export const isAdminRole = (role) =>
  role === "admin" || role === "super_admin";

export const isSuperAdmin = (role) => role === "super_admin";

export const dashboardPathForRole = (role) => {
  if (role === "contractor") return "/contractor/dashboard";
  if (isAdminRole(role)) return "/admin/dashboard";
  return "/customer/dashboard";
};
