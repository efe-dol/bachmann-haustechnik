import { createHash, randomBytes } from "crypto";

export const hashRegistrationToken = (token: string) => {
  return createHash("sha256").update(token.trim()).digest("hex");
};

export const generateRegistrationToken = () => {
  return randomBytes(24).toString("base64url");
};

export const buildTokenPreview = (token: string) => {
  const safe = token.replace(/[^a-zA-Z0-9]/g, "");
  return safe.slice(0, 6).toUpperCase();
};
