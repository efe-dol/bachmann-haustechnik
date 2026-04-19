export type AppRole = "administrator" | "intern";

export type AuthContext = {
  userId: string;
  email: string | null;
  fullName: string;
  role: AppRole | null;
};
