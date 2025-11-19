export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAdminUser = () => {
  const user = getCurrentUser();
  return !!user && user.role === "admin";
};